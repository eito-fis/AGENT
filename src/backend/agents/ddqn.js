import { Agent } from './agent';	
import { DQNAgent } from './dqn';
import * as tf from '@tensorflow/tfjs';
//import * as _tf from '@tensorflow/tfjs-node'
//const tf = _tf.default


const MAXSTEPS = 1000

class DDQNAgent extends DQNAgent {
	constructor(env, trainSteps, loggingPeriod, bufferSize=1e6, learningRate=5e-5,
		batchSize=1024, gamma=0.9, epsilon=1, copyPeriod=32) {
		super(env, trainSteps, loggingPeriod, bufferSize, learningRate, batchSize, gamma, epsilon);
		this.copyPeriod = copyPeriod;
	}

	// Take in number of episodes to train, update model
	// References trainSteps and loggingPeriod
	train() {
		if (!this.model) {
			this.model = this.buildModel();
			this.targetModel = this.buildModel();
			this.targetModel.trainable = false;
			this.copyWeights(this.model, this.targetModel);
		}
		let [states, actions, rewards, dones] = this.rollout(this.replayBuffer.maxSize);
		this.replayBuffer.pushEpisode(states, actions, rewards, dones);
		for (let i = 0; i < this.trainSteps; i++) {
			this.epsilon = this.getEpsilon(i);
			[states, actions, rewards, dones] = this.rollout(64);
			this.replayBuffer.pushEpisode(states, actions, rewards, dones);
			let loss = this.update();
			if (i != 0 && i % this.copyPeriod == 0) {
				this.copyWeights(this.model, this.targetModel);
			}
			if (i != 0 && i % this.loggingPeriod == 0) {
				this.log(loss);
			}
		}
	}

	// Take an update step on the model, return the loss
	update() {
		const samples = this.replayBuffer.sample(this.batchSize);
		const lossFunc = () => tf.tidy(() => {
			const states = tf.tensor2d(samples.map(x => x[0]), undefined, "float32");
			const actions = tf.tensor1d(samples.map(x => x[1]), "int32");
			const rewards = tf.tensor1d(samples.map(x => x[2]), "int32");
			const nStates = tf.tensor2d(samples.map(x => x[3]), undefined, "float32");
			const dones = tf.tensor1d(samples.map(x => x[4]), "int32");
			const donesMask = tf.scalar(1).sub(dones);

			const Qs = this.model
				.apply(states)
				.mul(tf.oneHot(actions, this.env.getActionSpace()))
				.sum(-1);
			const nQs = this.targetModel
				.apply(nStates)
				.max(-1);
			const targets = nQs
				.mul(donesMask)
				.mul(this.gamma)
				.add(rewards);

			return tf.losses.meanSquaredError(targets, Qs);
		});

		const {value, grads} = tf.variableGrads(lossFunc);
		this.optimizer.applyGradients(grads);
		tf.dispose(grads);
		return value.dataSync()[0];
	}

	copyWeights(srcModel, destModel) {
		let destTrainable;
		if (srcModel.trainable != destModel.trainable) {
			destTrainable = destModel.trainable;
			destModel.trainable = srcModel.trainable;
		}
		destModel.setWeights(srcModel.getWeights());
		if (destTrainable) {
			destModel.trainable = destTrainable;
		}
	}
}

export { DDQNAgent };

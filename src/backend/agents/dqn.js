import { Agent } from './agent';	
// import * as tf from '@tensorflow/tfjs';
import * as _tf from '@tensorflow/tfjs-node'
const tf = _tf.default


const MAXSTEPS = 1000

class ReplayBuffer {
	constructor(bufferSize) {
		this.maxSize = bufferSize;
		this.buffer = [];
		this.idxs = [];
	}

	push(data) {
		if (this.length == this.maxSize) {
			this.buffer.shift();
		} else {
		 this.idxs.push(this.length);
		}
		this.buffer.push(data);
	}

	pushEpisode(states, actions, rewards, dones) {
		for (let i = 0; i < states.length - 1; i++) {
			let data = [states[i], actions[i], rewards[i], states[i + 1], dones[i]];
			this.push(data);
		}
	}

	sample(numSamples) {
		tf.util.shuffle(this.idxs);
		let sample = new Array(numSamples);
		for (let i = 0; i < numSamples; i ++) {
			sample[i] = this.buffer[this.idxs[i]];
		}
		return sample;
	}

	get length() {
		return this.buffer.length;
	}
}

class DQNAgent extends Agent {
	constructor(env, trainSteps, loggingPeriod, bufferSize=128, learningRate=0.0001,
		batchSize=32, gamma=0.99, epsilon=0.75) {
		super(env, trainSteps, loggingPeriod);
		this.replayBuffer = new ReplayBuffer(bufferSize);
		this.optimizer = tf.train.adam(learningRate);
		this.trainSteps = trainSteps;
		this.batchSize = batchSize;
		this.gamma = gamma;
		this.epsilon = epsilon;
		this.isTrain = true;
	}

	// Initialize model
	buildModel(hidden=[32, 32]) {
		if (!Array.isArray(hidden)) {
			hidden = [hidden];
		}

		const model = tf.sequential();
		const inputShape = [this.env.getStateSpace()];
		const outputShape = this.env.getActionSpace();
		console.log(inputShape);
		hidden.forEach((hiddenSize, i) => {
			model.add(tf.layers.dense({
				"units": hiddenSize,
				"inputShape": i == 0 ? inputShape : undefined,
				"activation": "relu",
			}));
		});
		model.add(tf.layers.dense({"units": outputShape}));
		return model
	}

	// Take in an observation, return an action
	// Epsilon greedy if we are training
	policy(obs) {
		if (this.isTrain && Math.random() < this.epsilon) {
			return Math.floor(Math.random() * this.env.getActionSpace());
		} else {
			const action = tf.tidy(() => {
					const logits = this.model.apply([[obs]]);
					const action = logits.squeeze().argMax();
					return action.dataSync();
			});
			return action[0];
		}
	}

	// Take in number of episodes to train, update model
	// References trainSteps and loggingPeriod
	train() {
		super.train();
		let [states, actions, rewards, dones] = this.rollout(this.replayBuffer.maxSize / 2);
		this.replayBuffer.pushEpisode(states, actions, rewards, dones);
		for (let i = 0; i < this.trainSteps; i++) {
			[states, actions, rewards, dones] = this.rollout(32);
			// for (let i = 0; i < states.length; i++) {
			// 	console.log(states[i], actions[i], rewards[i], dones[i]);
			// }
			// console.log();
			this.replayBuffer.pushEpisode(states, actions, rewards, dones);
			let loss = this.update();
			if (i != 0 && i % this.loggingPeriod == 0) {
				this.log(loss);
			}
		}
	}

	// Take an update step on the model, return the loss
	update() {
		const samples = this.replayBuffer.sample(this.batchSize);
		// console.log(samples);
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
			const nQs = this.model
				.apply(nStates)
				.max(-1);
			const targets = nQs
				.mul(donesMask)
				.mul(this.gamma)
				.add(rewards);

			return tf.losses.meanSquaredError(targets, Qs);
		});

		const {value, grads} = tf.variableGrads(lossFunc);
		// console.log(this.model.layers[0]._trainableWeights[1].val.dataSync().slice(5));
		// console.log(value.dataSync()[0]);
		this.optimizer.applyGradients(grads);
		tf.dispose(grads);
		return value.dataSync()[0];
	}

	log(loss) {
		this.isTrain = false;
		const [states, _a, rewards, _d]= this.rollout(MAXSTEPS, true);
		this.loggedStates.push(states);
		this.metrics["Losses"].push(loss);
		this.metrics["Reward"].push(rewards.reduce((a, b) => a + b));
		// console.log(_a.slice(0, 5));
		// console.log(loss, this.metrics["Reward"][this.metrics["Reward"].length - 1]);
		this.isTrain = true;
	}
}

export { DQNAgent };

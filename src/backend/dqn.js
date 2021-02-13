import Agent from 'Agent';
import * as tf from '@tensorflow/tfjs';

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
		for (i = 0; i < states.length - 1; i++) {
			data = [states[i], actions[i], rewards[i], states[i + 1], dones[i]];
			this.push(data);
		}
	}

	sample(numSamples) {
		tf.util.shuffle(this.idxs);
		sample = new Array(numSamples);
		for (i = 0; i < numSamples; i ++) {
			sample[i] = this.buffer[this.idxs[i]];
		}
		return sample;
	}

	get length() {
		return this.buffer.length;
	}
}

class DQNAgent extends Agent {
	constructor(env, trainSteps, loggingPeriod, bufferSize=512, learningRate=0.01,
		batchSize=4, gamma=0.99, epsilon=0.25) {
		super(env, trainSteps, loggingPeriod);
		this.replayBuffer = new ReplayBuffer(bufferSize);
		this.optimizer = tf.train.adam(learningRate);
		this.batchSize = batchSize;
		this.gamma = gamma;
		this.epsilon = epsilon;
		this.train = true;
	}

	// Initialize model
	buildModel(hidden=[32, 32]) {
		if (!Array.isArray(hidden)) {
			hidden = [hidden];
		}

		const model = tf.sequential();
		const inputShape = env.getStateSpace();
		const outputShape = env.getActionSpace();
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
		if (this.train && Math.random() < this.epsilon) {
			return Math.floor(Math.random() * this.env.getActionSpace());
		} else {
			action = tf.tidy(() => {
					const logits = this.model.apply(obs);		
					const action = tf.argmax(logits);
					return action.dataSync();
			});
			return action;
		}
	}

	// Take in number of episodes to train, update model
	// References trainSteps and loggingPeriod
	train(episodes) {
		super.train();
		[states, actions, rewards, dones] = this.rollout(this.replayBuffer.maxSize / 2);
		this.replayBuffer.pushEpisode(states, actions, rewards, dones);
		for (i = 0; i < episodes; i++) {
			[states, actions, rewards, dones] = this.rollout(MAXSTEPS, episodic=true);
			this.replayBuffer.pushEpisode(states, actions, rewards, dones);
			loss = this.update();
			if (i != 0 && i % this.loggingPeriod == 0) {
				this.log(loss);
			}
		}
	}

	// Take an update step on the model, return the loss
	update() {
		samples = this.replayBuffer.sample(this.batchSize);
		const lossFunc = () => tf.tidy(() => {
			const states = tf.tensor1d(samples.map(x => x[0]), "float32");
			const actions = tf.tensor1d(samples.map(x => x[1]), "int32");
			const rewards = tf.tensor1d(samples.map(x => x[2]), "int32");
			const nStates = tf.tensor1d(samples.map(x => x[4]), "float32");
			const dones = tf.tensor1d(samples.map(x => x[5]), "int32");
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
		this.optimizer.applyGradients(grads);
		tf.dispose(grads);
		return value
	}

	log(loss) {
		this.train = false;
		states, _, rewards, _ = this.rollout(MAXSTEPS, episodic=true);
		this.loggedSteps.push(states);
		this.metrics["Losses"].push(loss);
		this.metrics["Reward"].push(rewards.reduce((a, b) => a + b));
		this.train = true;
	}
}

export { DQNAgent };

import Agent from 'Agent';
import * as tf from '@tensorflow/tfjs';

const MAXSTEPS = 1000

class Reinforce extends Agent {
	constructor(env, trainSteps, loggingPeriod, learningRate=0.01,
		batchSize=64, gamma=0.99) {
		super(env, trainSteps, loggingPeriod);
		this.optimizer = tf.train.adam(learningRate);
		this.batchSize = batchSize;
		this.gamma = gamma;
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
		return tf.tidy(() => {
				const logits = this.model.apply(obs);		
				const action = tf.multinominal(logits, 1, normalized=false);
				return action.dataSync();
		});
	}

	// Take in number of episodes to train, update model
	// References trainSteps and loggingPeriod
	train(episodes) {
		super.train();
		[states, actions, rewards, dones] = this.rollout(this.replayBuffer.maxSize / 2);
		this.replayBuffer.pushEpisode(states, actions, rewards, dones);
		for (i = 0; i < episodes; i++) {
			[states, actions, rewards, dones] = this.rollout(MAXSTEPS, episodic=true);
			rewards = this.discountReward(rewards, dones);
			loss = this.update(states, actions, rewards);
			if (i != 0 && i % this.loggingPeriod == 0) {
				this.log(loss);
			}
		}
	}

	discountReward(rewards, dones) {
		return ;
	}

	// Take an update step on the model, return the loss
	update(states, actions, rewards) {
		const lossFunc = () => tf.tidy(() => {
			const states = tf.tensor1d(states, "float32");
			const actions = tf.tensor1d(actions, "int32");
			const rewards = tf.tensor1d(rewards, "int32");

			const logits = this.model
				.apply(states);
			const probs = logits
				.softmax()
				.mul(tf.oneHot(actions, this.env.getActionSpace()))
				.sum(-1);
			const loss = logits
				.log()
				.mul(rewards)
				.mul(tf.scalar(-1))
				.mean()
			return loss
		});

		const {value, grads} = tf.variableGrads(lossFunc);
		this.optimizer.applyGradients(grads);
		tf.dispose(grads);
		return value
	}

	log(loss) {
		this.train = false;
		states, _, rewards, _ = this.rollout(MAXSTEPS, episodic=true);
		this.train = true;
		this.loggedSteps.push(states);
		this.metrics["Losses"].push(loss);
		this.metrics["Reward"].push(rewards.reduce((a, b) => a + b));
	}
}

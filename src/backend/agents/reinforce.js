import { Agent } from './agent';
import * as tf from '@tensorflow/tfjs';
//import * as _tf from '@tensorflow/tfjs-node'
//const tf = _tf.default

const MAXSTEPS = 1000

class ReinforceAgent extends Agent {
	constructor(env, trainSteps, loggingPeriod, learningRate=0.000005,
		batchSize=256, gamma=0.9) {
		super(env, trainSteps, loggingPeriod);
		this.optimizer = tf.train.adam(learningRate);
		this.batchSize = batchSize;
		this.gamma = gamma;
		this.isTrain = true;
	}

	// Initialize model
	buildModel(hidden=[8, 5]) {
		if (!Array.isArray(hidden)) {
			hidden = [hidden];
		}

		const model = tf.sequential();
		const inputShape = this.env.getStateSpace();
		const outputShape = this.env.getActionSpace();
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
	policy(obs) {
		return tf.tidy(() => {
			const logits = this.model.apply([[obs]]);		
			let action;
			if (this.isTrain) {
				action = tf.multinomial(logits, 1, false);
			} else {
				action = tf.argMax(logits);
			}
			
			return action.dataSync()[0];
		});
	}

	// Take in number of episodes to train, update model
	// References trainSteps and loggingPeriod
	async train() {
		super.train();
		let states, actions, rewards, dones;
		for (let i = 0; i < this.trainSteps; i++) {
			[states, actions, rewards, dones] = this.rollout(this.batchSize);
			rewards = this.discountReward(rewards, dones);
			const loss = this.update(states, actions, rewards);
			if (i != 0 && i % this.loggingPeriod == 0) {
				this.log(loss);
			}
			await tf.nextFrame();
		}
	}

	discountReward(rewards, dones) {
		const discReward = new Array(rewards.length);
		let reward = 0
		for (let i = rewards.length - 1; i >= 0; i--) {
			reward = rewards[i] + this.gamma * reward * (1 - dones[i]);
			discReward[i] = reward
		}
		return discReward;
	}

	// Take an update step on the model, return the loss
	update(states, actions, rewards) {
		const lossFunc = () => tf.tidy(() => {
			states = tf.tensor2d(states, undefined, "float32");
			actions = tf.tensor1d(actions, "int32");
			rewards = tf.tensor1d(rewards, "int32");

			const logits = this.model
				.apply(states);
			const probs = logits
				.softmax()
				.mul(tf.oneHot(actions, this.env.getActionSpace()))
				.sum(-1);
			const loss = probs
				.log()
				.mul(rewards)
				.mul(tf.scalar(-1))
				.mean()
			return loss
		});

		const loss = this.optimizer.minimize(lossFunc, true);

		return loss.dataSync()[0];
	}

	log(loss) {
		// this.isTrain = false;
		let [states, _a, rewards, _d] = this.rollout(MAXSTEPS, true);
		this.loggedStates.push(states);
		this.metrics["Losses"].push(loss);
		this.metrics["Reward"].push(rewards.reduce((a, b) => a + b));
		console.log(_a.slice(0, 10));
		console.log(loss, rewards.reduce((a, b) => a + b));
		this.isTrain = true;
	}
}

export { ReinforceAgent };

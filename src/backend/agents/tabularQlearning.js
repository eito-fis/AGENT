import { Agent } from './agent';
// import * as tf from '@tensorflow/tfjs';
import * as _tf from '@tensorflow/tfjs-node'
const tf = _tf.default

const MAXSTEPS = 1000

class TabularQAgent extends Agent {
	constructor(env, trainSteps, loggingPeriod, learningRate=0.01,
		gamma=0.99) {
		super(env, trainSteps, loggingPeriod);
		this.gamma = gamma;
		this.isTrain = true;
	}

	// Initialize model
	buildModel() {
		var model = {};
    var states = this.env.getAllStates();
    var actions = this.env.getAllActions();
    for (var s=0; s < states.length; s++) {
      for (var a=0; a < actions.length; a++) {
        model[[states[s], actions[a]].toString()] = 0;
      }
    }
    this.model = model;
		return model
	}

	// Take in an observation, return an action
	policy(obs) {
    var action = 0;
    var value = 0;
		for (var i=0; i < this.env.nA; i++) {
      if (value < this.model[[obs, i]]) {
        action = i;
        value = this.model[[obs, i]];
      }
    }
    return action;
	}

	// Take in number of episodes to train, update model
	// References trainSteps and loggingPeriod
	train() {
		super.train();
		let states, actions, rewards, dones;
    let s, a, r, ns, done;
    const acc_loss, loss;
		for (let i = 0; i < this.trainSteps; i++) {
      acc_loss = 0;
			[states, actions, rewards, dones] = this.epsRollout(MAXSTEPS, true, 1-i/this.trainSteps);
      for (let j = 0; j < states.length; j++) {
        s = states[j];
        a = actions[j];
        r = rewards[j];
        done = dones[j];
        if (done || j == states.length-1) {
          loss = r - this.model[[s,a]];
        } else {
          ns = states[j+1];
          loss = r + this.gamma * this.model[[ns, this.policy(ns)]] - this.model[[s,a]];
        }
        this.model[[s,a]] = this.model[[s,a]] + this.learningRate * loss;
        acc_loss = acc_loss + loss;
      }
			if (i != 0 && i % this.loggingPeriod == 0) {
				this.log(acc_loss/(states.length));
			}
		}
	}

  train(episodes) {
		super.train();
		// console.log(this.model)
		for (var i = 0; i < episodes; i++) {
		  var states, actions, rewards, dones;
			var rollout = this.epsRollout(MAXSTEPS, true, 1-i/episodes);
			states = rollout[0]
			actions = rollout[1]
			rewards = rollout[2]
			dones = rollout[3]
      var acc_loss = 0;
      for (var j = 0; j < states.length; j++) {
        var s = states[j];
        var a = actions[j];
        var r = rewards[j];
        var done = dones[j];
        if (done || j == states.length-1) {
          var loss = r - this.model[[s,a]];
        } else {
          var ns = states[j+1];
          var loss = r + this.gamma * this.model[[ns, this.policy(ns)]] - this.model[[s,a]];
        }
        this.model[[s,a]] = this.model[[s,a]] + this.learningRate * loss;
        if (isNaN(this.model[[s,a]])) {
          console.log("This")
          console.log(states.length)
          console.log(j)
          console.log(ns)
          console.log(this.policy(ns))
        }
        acc_loss = acc_loss + loss;
      }
			loss = acc_loss/(states.length - 1);
			if (i != 0 && i % this.loggingPeriod == 0) {
				this.log(loss);
			}
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
		this.metrics["Losses"].push(loss);
		this.metrics["Reward"].push(rewards.reduce((a, b) => a + b));
		console.log(_a.slice(0, 10));
		console.log(loss, rewards.reduce((a, b) => a + b));
		this.isTrain = true;
	}

  epsRollout(steps, episodic=false, eps=0) {
		const states = [];
		const actions = [];
		const rewards = [];
		const dones = [];
		let state, nState, action, reward, done;
		state = this.env.reset();
		for (let i = 0; i < steps; i++) {
      if (eps > Math.random()) {
        let envActions = this.env.getAllActions();
        action = envActions[Math.floor(Math.random() * envActions.length)];
      } else {
        action = this.policy(state);
      }
			[nState, reward, done] = this.env.step(action);
			states.push(state);
			actions.push(action);
			rewards.push(reward);
			dones.push(done);
			state = nState;
			if (done == 1) {
				if (episodic) {
					break;
				} else {
					state = this.env.reset();
				}
			}
		}
		return [states, actions, rewards, dones]
	}
}

export { TabularQAgent };

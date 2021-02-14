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

	log(loss) {
		// this.isTrain = false;
		let [states, _a, rewards, _d] = this.rollout(MAXSTEPS, true);
		this.metrics["Losses"].push(loss);
		this.metrics["Reward"].push(rewards.reduce((a, b) => a + b));
		console.log(_a.slice(0, 10));
		console.log(loss, rewards.reduce((a, b) => a + b));
		this.isTrain = true;
	}

  discretize(state) {
    let ret_val;
    var allStates = this.env.getAllStates();
    var min_d = 1000;
    for (var i=0; i < allStates.length; i++) {
      var center = allStates[i];
      var d = 0;
      for (var j=0; j < center.length; j++) {
        d = d + Math.abs(center[j] - state[j]);
      }
      if (d < min_d) {
        min_d = d;
        ret_val = center;
      }
    }
    return ret_val
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
			states.push(this.discretize(state));
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

export class Agent {
	/**
	 * Agent Class
	 */

	constructor(env, trainSteps, loggingPeriod) {
		this.env = env;
		this.model = null;
		this.trainSteps = trainSteps;
		this.loggingPeriod = loggingPeriod;
		this.loggedStates = [];
		this.metrics = {
			"Losses": [],
			"Reward": [],
		}
	}

	// Initialize model
	buildModel() {}

	// Take in an observation, return an action
	policy() {}

	// Take in number of episodes to train, update model
	// References trainSteps and loggingPeriod
	train() {
		if (!this.model) {
			this.model = this.buildModel();
		}
	}

	// Takes `steps` number of steps and returns results
	rollout(steps, episodic=false) {
		const states = [];
		const actions = [];
		const rewards = [];
		const dones = [];
		let state, nState, action, reward, done;
		state = this.env.reset();
		for (let i = 0; i < steps; i++) {
			action = this.policy(state);
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
		states.pop();
		return [states, actions, rewards, dones]
	}
}

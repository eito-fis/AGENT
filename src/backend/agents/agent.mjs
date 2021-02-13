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
		states = [];
		actions = [];
		rewards = [];
		dones = [];
		state = env.reset();
		states.push(state);
		for (i = 0; i < steps; i++) {
			action = this.policy(state);
			state, reward, done = this.env.step(action);
			states.push(state);
			actions.push(action);
			rewards.push(reward);
			dones.push(done);
			if (done) {
				if (episodic) {
					break;
				} else {
					state = env.reset();
				}
			}
		}
		states = states.pop();
		return [states, actions, rewards, dones]
	}
}

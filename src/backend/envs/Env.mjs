class Env {
	/**
	 * Env Class
	 */

	constructor() {}
	
	// Returns a tensor describing the state space of the env
	// Will be used to determine the input dimensionality of the model
	getStateSpace() {}

	// Returns a tesor describing the action space of the env
	// Will be used to determine the output dimensionality of the model
	getActionSpace() {}

	// Resets the environment and returns the new state
	reset() {}

	// Returns the current state
	getCurrentState() {}

	// Takes an action as an integer and updates the state
	step() {}

	// Renders the current state
	// Render how?
	// Takes states?
	render() {}

	// Returns true if the current state is done, else false
	isDone() {}
}

export { Env };

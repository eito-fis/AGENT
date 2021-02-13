/* Based on the OpenAI Gym implementation
 * https://github.com/openai/gym/blob/master/gym/envs/toy_text/frozen_lake.py
 */

export class FrozenLakeEnv {
	/**
	 * Env Class
	 */



	constructor(desc=null, map_name="4x4", is_slippery=true) {

	  this.MAPS = {
        "4x4": [
            "SFFF",
            "FHFH",
            "FFFH",
            "HFFG"
        ],
        "8x8": [
            "SFFFFFFF",
            "FFFFFFFF",
            "FFFHFFFF",
            "FFFFFHFF",
            "FFFHFFFF",
            "FHHFFFHF",
            "FHFFHFHF",
            "FFFHFFFG"
        ],
    };

    if (desc === null && map_name === null) {
      this.desc = this.MAPS["4x4"];
    } else if (desc===null) {
      this.desc = this.MAPS[map_name];
    }

    this.nrow = this.desc.length;
    this.ncol = this.desc[0].length;
    this.reward_range = (0, 1);

    this.nA = 4;
    this.nS = this.nrow * this.ncol;

    this.reset();
  }

	// Returns a tensor describing the state space of the env
	// Will be used to determine the input dimensionality of the model
	getStateSpace() {
    return 2;
  }

	// Returns a tesor describing the action space of the env
	// Will be used to determine the output dimensionality of the model
	getActionSpace() {
    return 4;
  }

	// Resets the environment and returns the new state
	reset() {
    this.state = [0,0];
    return this.state;
  }

	// Returns the current state
	getCurrentState() {
    return this.state;
  }

	// Takes an action as an integer and updates the state
	step(action) {
    if (![1,2,3,4].includes(action)) {
      alert("Invalid action!");
    }
    var curr_pos = this.state;
    var row = curr_pos[0];
    var col = curr_pos[1];
    // Update state
    if (action === 0) { // Left
      col = Math.max(col-1, 0);
    } else if (action === 1) { // Down
      row = Math.min(row+1, this.nrow-1);
    } else if (action === 2) { // Right
      col = Math.min(col+1, this.ncol-1);
    } else if (action === 3) { // Up
      row = Math.max(row-1, 0);
    } else {
      alert("Invalid action!");
    }

    this.state = [row, col];

    if (this.desc[row][col] === "H") {
      env.reset();
      return [[row, col], 0, 1];
    } else if (this.desc[row][col] === "G") {
      return [this.state, 1, 1];
    } else {
      return [this.state, 0, 0];
    }

  }

	// Renders the current state
	// Render how?
	// Takes states?
	render() {}

	// Returns true if the current state is done, else false
	isDone() {
    curr_pos = this.state;
    row = curr_pos[0];
    col = curr_pos[1];
    return this.desc[row][col] === "G";
  }
}

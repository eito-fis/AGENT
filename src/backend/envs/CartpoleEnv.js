/* Based on the OpenAI Gym implementation
 * https://github.com/openai/gym/blob/master/gym/envs/toy_text/frozen_lake.py
 */

import { Env } from "./Env"

class CartpoleEnv extends Env {
	/**
	 * Env Class
	 */

	constructor() {
		super();

		this.gravity = 9.8;
		this.cartMass = 1.0;
		this.poleMass = 0.1;
		this.totalMass = this.cartMass + this.poleMass;

		this.cartWidth = 0.2;
		this.cartHeight = 0.1;
		this.poleLength = 0.5;
		this.poleMoment = this.poleMass * this.poleLength;

		this.forceMag = 10.0;
		this.tau = 0.02;

		this.xThresh = 2.4;
		this.thetaThresh = 12 / 360 * 2 * Math.PI;

    this.nA = 2;
    this.nS = 4;

    this.done = false;

    this.reset();
  }

	// Returns a tensor describing the state space of the env
	// Will be used to determine the input dimensionality of the model
	getStateSpace() {
    return this.nS;
  }

	// Returns a tesor describing the action space of the env
	// Will be used to determine the output dimensionality of the model
	getActionSpace() {
    return this.nA;
  }

	// Resets the environment and returns the new state
	reset() {
		this.x = Math.random() - 0.5;
		this.xDot = (Math.random() - 0.5) * 1;
		this.theta = (Math.random() - 0.5) * 2 * (6 / 360 * 2 * Math.PI);
		this.thetaDot = (Math.random() - 0.5) * 0.5;

		return this.getCurrentState()
  }

	// Returns the current state
	getCurrentState() {
    return [this.x, this.xDot, this.theta, this.thetaDot];
  }

	// Takes an action as an integer and updates the state
	step(action) {
		const force = action > 0 ? this.forceMag : -this.forceMag;

		const cosTheta = Math.cos(this.theta);
		const sinTheta = Math.sin(this.theta);

		const temp = (force + this.poleMoment * this.thetaDot * this.thetaDot * sinTheta)
			/ this.totalMass;
		const thetaAcc = (this.gravity * sinTheta - cosTheta * temp) /
			(this.poleLength * (4 / 3 - this.poleMass * cosTheta * cosTheta / this.totalMass));
		const xAcc = temp - this.poleMoment * thetaAcc * cosTheta / this.totalMass;

		this.x += this.tau * this.xDot;
		this.xDot += this.tau * xAcc;
		this.theta += this.tau * this.thetaDot;
		this.thetaDot += this.tau * thetaAcc;

		const done = this.isDone();
		let reward;
		if (done) {
			reward = 0;
		} else {
			reward = 1;
		}

		return [this.getCurrentState(), reward, done];
  }

	// Renders the current state
	// Render how?
	// Takes states?
	render() {}

	// Returns true if the current state is done, else false
	isDone() {
		return (
			this.x < -this.xThresh ||
			this.x > this.xThresh ||
			this.theta < -this.thetaThresh ||
			this.theta > this.thetaThresh
		);
  }
}

export { CartpoleEnv };

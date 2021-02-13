import { ReinforceAgent } from "./reinforce";
import { DQNAgent } from "./dqn";
import React from 'react'

function buildAgent(name, env, trainSteps, loggingPeriod=10) {
	return new AGENTSLOOKUP[name](env, trainSteps, loggingPeriod);
}

const AGENTS = ["DQN", "REINFORCE"];

const AGENTSLOOKUP = {
	"DQN": DQNAgent,
	"REINFORCE": ReinforceAgent,
}

export { buildAgent, AGENTS };

import { FrozenLakeEnv } from "../envs/FrozenLakeEnv";

function test() {
	console.log("Testing...");
	const env = new FrozenLakeEnv();
	const agent = buildAgent("DQN", env, 100);
}

test()
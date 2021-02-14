import { ReinforceAgent } from "./reinforce";
import { DQNAgent } from "./dqn";
import { DDQNAgent } from "./ddqn";
import { TabularQAgent  } from "./tabularQlearning";

function buildAgent(name, env, trainSteps=10000, loggingPeriod=10) {
	return new AGENTSLOOKUP[name](env, trainSteps, loggingPeriod);
}

const AGENTS = ["DQN", "REINFORCE", "DDQN", "Tabular Q"];

const AGENTSLOOKUP = {
	"DQN": DQNAgent,
	"DDQN": DDQNAgent,
	"REINFORCE": ReinforceAgent,
	"Tabular Q": TabularQAgent,
}

export { buildAgent, AGENTS };

// import { FrozenLakeEnv } from "../envs/FrozenLakeEnv";
// import { CartpoleEnv } from "../envs/CartpoleEnv";

// function test() {
// 	console.log("Testing...");
// 	// const env = new FrozenLakeEnv();
// 	const env = new CartpoleEnv();
// 	// const agent = buildAgent("DQN", env, 100000);
// 	// const agent = buildAgent("DDQN", env, 100000);
// 	const agent = buildAgent("REINFORCE", env, 100000);
// 	agent.train();
// }

// test()

import { ReinforceAgent } from "./reinforce";
import { DQNAgent } from "./dqn";

function buildAgent(name, env, trainSteps, loggingPeriod=10) {
	return AGENTSLOOKUP[name](env, trainSteps, loggingPeriod);
}

const AGENTS = ["DQN", "REINFORCE"];

const AGENTSLOOKUP = {
	"DQN": DQNAgent,
	"REINFORCE": ReinforceAgent,
}

export { buildAgent, AGENTS };

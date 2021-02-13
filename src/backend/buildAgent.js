import { ReinforceAgent } from "reinforce"
import { DQNAgent } from "dqn"

buildAgent(name, env, trainSteps, loggingPeriod=10) {
	return AGENTSLOOKUP[name](env, trainSteps, loggingPeriod);
}

AGENTS = ["DQN", "REINFORCE"];

AGENTSLOOKUP = {
	"DQN": DQNAGent,
	"REINFORCE": ReinforceAgent,
}

export { buildAgent, AGENTS };

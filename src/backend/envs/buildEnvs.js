import { FroazenLakeEnv } from "./FrozenLakeEnv";
import { CartpoleEnv } from "./CartpoleEnv";

function buildEnv(name) {
	return new ENVSLOOKUP[name]();
}

const ENVS = ["Frozen Lake", "Cartpole"];

const AGENTSLOOKUP = {
	"Frozen Lake": FrozenLakeEnv,
	"Cartpole": CartpoleEnv,
}

export { buildEnv, ENVS };

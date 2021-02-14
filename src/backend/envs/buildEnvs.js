import { FrozenLakeEnv } from "./FrozenLakeEnv";
import { CartpoleEnv } from "./CartpoleEnv";

function buildEnv(name) {
	return new ENVSLOOKUP[name]();
}

const ENVS = ["Frozen Lake", "Cartpole"];

const ENVSLOOKUP = {
	"Frozen Lake": FrozenLakeEnv,
	"Cartpole": CartpoleEnv,
}

export { buildEnv, ENVS };

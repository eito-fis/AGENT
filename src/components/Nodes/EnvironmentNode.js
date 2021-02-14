import React, { useContext } from "react";
import { Handle } from "react-flow-renderer";
import { CurrentState } from "../../context/CurrentState";
import { ENVS, buildEnv } from "../../../src/backend/envs/buildEnvs";

export default function EnvironmentNode() {
  
  // Get context
  const { envs, agents, setAgents, setEnvs } = useContext(CurrentState);

  // User selects an env
  const handleSelectChange = (e) => {

    const item = e.target.value; // Extract options value

    // Get and set env
    const envsHolder = item !== 'Default' ? buildEnv(item) : null;
    setEnvs(envsHolder);

    // Replace env in Agents object
    if (agents) {
      // Clone ES6 class instance
      const newAgents = Object.assign(Object.create(Object.getPrototypeOf(agents)), agents);
      newAgents.env = envsHolder;
      setAgents(newAgents);
    }
  };

  const name = {
    'Default': 'Default',
    'CartpoleEnv': 'Cartpole',
    'FrozenLakeEnv': 'Frozen Lake',
  };

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <select value={envs ? name[envs.constructor.name] : 'Default'} onChange={handleSelectChange.bind(null)}>
        <option value="Default">Default</option>
        {ENVS.map((item, index) => <option key={index} value={item}>{item}</option>)}
      </select>
      <Handle
        type="source"
        position="right"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
}

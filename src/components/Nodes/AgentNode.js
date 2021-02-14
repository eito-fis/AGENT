import React, { useContext } from "react";
import { Handle } from "react-flow-renderer";
import { CurrentState } from "../../context/CurrentState";
import { AGENTS, buildAgent } from "../../../src/backend/agents/buildAgent";

export default function EnvironmentNode() {

  // Get context
  const { envs, agents, setAgents } = useContext(CurrentState);

  // User selects an agent
  const handleSelectChange = (e) => {

    const item = e.target.value; // Extract options value

    if (item !== 'Default') {
      setAgents(buildAgent(item, envs));
    } else {
      setAgents(null);
    }
  };
  
  const name = {
    'DQNAgent': 'DQN',
    'ReinforceAgent': 'REINFORCE',
    'DDQNAgent': 'DDQN',
    'TabularQAgent': 'Tabular Q',
  };
  
  return (
    <>
      <Handle
        type="target"
        position="right"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <select value={agents ? name[agents.constructor.name] : 'Default'} onChange={handleSelectChange.bind(null)}>
        <option value='Default'>Default</option>
        {AGENTS.map((item, index) => <option key={index} value={item}>{item}</option>)}
      </select>
      <Handle
        type="source"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
}

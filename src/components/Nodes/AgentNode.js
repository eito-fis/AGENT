import React, { useContext } from "react";
import { Handle } from "react-flow-renderer";
import { CurrentState } from "../../context/CurrentState";
import { AGENTS, buildAgent } from "../../../src/backend/agents/buildAgent";

export default function EnvironmentNode({ props}) {

  const { envs, agents, setAgents } = useContext(CurrentState);

  const handleSelectChange = (e) => {
    const item = e.target.value;
    if (e.target.value !== 'Default') {
      setAgents(buildAgent(item, envs));
    }
  };

  return (
    <>
      <Handle
        type="target"
        position="right"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <select onChange={handleSelectChange.bind(null)}>
        <option value="Default">Default</option>
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

// import src from "*.avif";
import React, { useContext } from "react";
import { Handle } from "react-flow-renderer";
import { CurrentState } from "../../context/CurrentState";
import { ENVS, buildEnv } from "../../../src/backend/envs/buildEnvs";

export default function EnvironmentNode({ props }) {
  
  const { setEnvs } = useContext(CurrentState);

  const handleSelectChange = (e) => {
    const item = e.target.value;
    if (e.target.value !== 'Default') {
      setEnvs(buildEnv(item));
    }
  };

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <select onChange={handleSelectChange.bind(null)}>
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

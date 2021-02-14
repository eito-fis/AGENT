// import src from "*.avif";
import React, { useContext } from "react";
import { Handle } from "react-flow-renderer";
import { CurrentState } from "../../context/CurrentState";
import { ENVS, buildEnv } from "../../../src/backend/envs/buildEnvs";

function Envs() {
  const { envs, setEnvs, agents, setAgents } = useContext(CurrentState);
  let testing;
  return ENVS.map((item) => (
    <option
      value={item}
      onClick={
        (() => {
          testing = buildEnv( item );
          console.log(testing)}
        )}
    >
      {item}
    </option>
  ));
}
export default function EnvironmentNode({ props }) {
  const { envs, setEnvs, agents, setAgents } = useContext(CurrentState);
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <select>
        <Envs />
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

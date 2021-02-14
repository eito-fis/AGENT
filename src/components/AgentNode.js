import React from "react";
import { Handle } from "react-flow-renderer";
export default function EnvironmentNode({ props}) {
  return (
    <>
      <Handle
        type="target"
        position="right"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <select>
        <option value="">Agent</option>
        <option value="cartpole">Edit Model</option>
        <option value="frozenlake">Frozen Lake</option>
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

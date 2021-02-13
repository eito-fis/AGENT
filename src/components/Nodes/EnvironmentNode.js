import React from "react";
import { Handle } from "react-flow-renderer";
export default function EnvironmentNode({ props}) {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <select>
        <option value="">Environment</option>
        <option value="cartpole">Cart Pole</option>
        <option value="frozenlake">Frozen Lake</option>
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

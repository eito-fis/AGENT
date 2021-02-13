import React, { useState } from "react";
import EnvironmentNode from "./EnvironmentNode";
import AgentNode from "./AgentNode";
import ReactFlow, { addEdge, Background, Controls } from "react-flow-renderer";

const nodeTypes = {
  EnvironmentNode: EnvironmentNode,
  AgentNode: AgentNode,
};
const initialElements = [
  {
    id: "1",
    type: "EnvironmentNode",
    data: { label: "Environment" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "AgentNode",
    data: { label: "Agent" },
    position: { x: 0, y: 300 },
    targetPosition: "right",
    sourcePosition: "left",
  },
  {
    id: "e1-2",
    type: "step",
    source: "1",
    target: "2",
    animated: true,
    label: "State",
  },
  {
    id: "e2-1",
    type: "step",
    source: "2",
    target: "1",
    animated: true,
    label: "Action",
  },
];

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const EnvAgentTab = () => {
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((e) => addEdge(params, e));
  return (
    <>
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        nodeTypes={nodeTypes}
        style={{ width: "100%", height: "90vh" }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background color="#888" gap={16} />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default EnvAgentTab;

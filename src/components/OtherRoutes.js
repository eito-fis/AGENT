import React, { useState, useMemo } from "react";
import EnvAgentTab from "./Tabs/EnvAgentTab";
import ChartTab from "./Tabs/ChartTab";
import { Route } from "react-router-dom";
import VisualTab from "./Tabs/VisualTab";
import TrainBar from "./Bars/TrainBar";
import styled from "styled-components";
import Sidebar from "./Bars/Sidebar";
import { CurrentState } from "../context/CurrentState";
const Container = styled.div`
  display: flex;
`;

// This is a separate component so we can have TrainBar mounted almost always
const OtherRoutes = () => {
  const [envs, setEnvs] = useState(null);
  const [agents, setAgents] = useState(null);
  const value = useMemo(() => ({ envs, setEnvs, agents, setAgents }), [
    envs,
    setEnvs,
    agents,
    setAgents,
  ]);
  return (
    <Container>
      <Sidebar />
      <CurrentState.Provider value={value}>
        <Route path="/envagent" exact component={EnvAgentTab} />
        <Route path="/chart" exact component={ChartTab} />
        <Route path="/visual" exact component={VisualTab} />
      </CurrentState.Provider>
      <TrainBar />
    </Container>
  );
};

export default OtherRoutes;

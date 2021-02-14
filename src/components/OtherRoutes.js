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

// This is a separate component so we can have TrainBar mounted always
const OtherRoutes = () => {

  // Instantiate context state
  const [envs, setEnvs] = useState(null);
  const [agents, setAgents] = useState(null);
  const [ training, setTraining ] = useState(false);

  // Optimize context state
  const value = useMemo(() => ({ envs, setEnvs, agents, setAgents, training, setTraining }), [
    envs,
    setEnvs,
    agents,
    setAgents,
    training,
    setTraining,
  ]);

  return (
    <Container>
      <CurrentState.Provider value={value}>
        <Sidebar />
        <Route path="/envagent" exact component={EnvAgentTab} />
        <Route path="/chart" exact component={ChartTab} />
        <Route path="/visual" exact component={VisualTab} />
        <TrainBar />
      </CurrentState.Provider>
    </Container>
  );
};

export default OtherRoutes;

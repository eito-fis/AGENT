import React from 'react';
import EnvAgentTab from './EnvAgentTab';
import ChartTab from './ChartTab';
import { Route } from 'react-router-dom';
import VisualTab from './VisualTab';
import TrainBar from './TrainBar';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
`;

// This is a separate component so we can have TrainBar mounted almost always
const OtherRoutes = () => {
  return (
    <Container>
      <Sidebar />
      <Route path='/envagent' exact component={EnvAgentTab} />
      <Route path='/chart' exact component={ChartTab} />
      <Route path='/visual' exact component={VisualTab} />
      <TrainBar />
    </Container>
  );
};

export default OtherRoutes;
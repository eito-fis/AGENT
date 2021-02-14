import React from 'react';
import styled from 'styled-components';
import NetworkSVG from '../../assets/images/layers.svg';
import ProgressSVG from '../../assets/images/graph-up.svg';
import VisualizationSVG from '../../assets/images/calculator-fill.svg';
import GoBackSVG from '../../assets/images/arrow-return-left.svg';
import SidebarIcon from './SidebarIcon';

const Container = styled.div`
  height: 100vh;
  background-color: #a8a8bd;
  width: 4.5rem;
  display: flex;
  flex-direction: column;
  flex-basis: 70px;
  flex-shrink: 0;

  .active {
    background-color: rgb(229,229,252);
  }
`;

const Sidebar = () => {

  const toggleObjArr = [
    { icon: GoBackSVG, path: '/' },
    { icon: NetworkSVG, path: '/envagent' },
    { icon: ProgressSVG, path: '/chart' },
    { icon: VisualizationSVG, path: '/visual' },
  ];

  return (
    <Container>
      {toggleObjArr.map((toggleObj, index) => <SidebarIcon key={index} toggleObj={toggleObj} />)}
    </Container>
  );
};

export default Sidebar;
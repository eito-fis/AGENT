import React from 'react';
import styled from 'styled-components';
import NetworkSVG from '../../assets/images/layers.svg';
import ProgressSVG from '../../assets/images/graph-up.svg';
import VisualizationSVG from '../../assets/images/calculator-fill.svg';
import GoBackSVG from '../../assets/images/arrow-return-left.svg';
import { useHistory, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  height: 100vh;
  background-color: #a8a8bd;
  width: 3.3rem;
  display: flex;
  flex-direction: column;

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
    <SidebarContainer>
      {toggleObjArr.map((toggleObj, index) => <SidebarIcon key={index} toggleObj={toggleObj} />)}
    </SidebarContainer>
  );
};

const SidebarIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  cursor: pointer;

  :first-child {
    margin-bottom: 5px;
  }

  :hover {
    background-color: #CCC;
  }

  .icon {
    width: 2rem;
  }
`;

const SidebarIcon = ({ toggleObj }) => {

  const history = useHistory();
  const { pathname } = useLocation();

  // Switch tabs
  const switchTabs = (path) => {
    history.push(path);
  };

  return (
    <SidebarIconContainer onClick={switchTabs.bind(null, toggleObj.path)} className={pathname === toggleObj.path ? "icon-wrapper active" : "icon-wrapper"}>
      <img className="icon" src={toggleObj.icon} alt="icon" />
    </SidebarIconContainer>
  );
};

export default Sidebar;
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0px;
  cursor: pointer;

  :first-child {
    padding-bottom: 20px;
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
    <Container onClick={switchTabs.bind(null, toggleObj.path)} className={pathname === toggleObj.path ? "active" : ""}>
      <img className="icon" src={toggleObj.icon} alt="icon" />
    </Container>
  );
};

export default SidebarIcon;
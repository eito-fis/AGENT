import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 37px;
  padding: 10px 10px 0;

  .section {
    font-size: 1.3rem;
    width: 60%;
  }
`;

// Dropdown items which are non-clickable ('Model Status')
const DropdownData = ({ section }) => {

  return (
    <Container>
      <span className="section">{section}</span>
    </Container>
  );
};

export default DropdownData;
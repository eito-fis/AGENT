import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 37px;
  padding: 10px 10px 0;
  border-bottom: 1px solid black;
  cursor: pointer;

  .section {
    font-size: 1.3rem;
    width: 60%;
  }

  :hover {
    background-color: lightgrey;
  }
`;

// Dropdown items which are clickable ('Metrics', 'Controls')
const DropdownSection = ({ section, sectionCallback }) => {

  return (
    <Container onClick={sectionCallback.bind(null, section)}>
      <span className="section">{section}</span>
    </Container>
  );
};

export default DropdownSection;

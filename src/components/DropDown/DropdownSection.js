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

const Flagged = styled.div`
  padding: 10px 10px 0;
  line-height: 1.5;
  margin-top: 5px;

  .section {
    font-size: 1.1rem;
  }
`;

// Dropdown items which are clickable ('Layers', 'Activations', 'Templates', 'Share', etc.)
// If flag is set, render section as non-clickable (applies only to 'Parameters')
const DropdownSection = ({ section, sectionCallback, flag }) => {

  const renderContent = () => {
    if (flag) { // Only renders for 'Templates'
      return (
        <Flagged>
          <span className="section">{section}</span>
        </Flagged>
      );
    }
    return (
      <Container onClick={sectionCallback.bind(null, section)}>
        <span className="section">{section}</span>
      </Container>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default DropdownSection;

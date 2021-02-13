import React from 'react';
import styled from 'styled-components';
import DropdownSection from './DropdownSection';
import DropdownData from './DropdownData';
import ArrowDownSVG from '../../assets/images/Arrow-down.svg';

const Container = styled.div`
  margin-top: 10px;

  .header-wrapper {
    background-color: #555555;
    height: 35px;
    width: 13em;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .header {
    font-size: 1.4em;
    color: white;
  }

  .header-icon {
    transform: translate(0, 10%);
    width: 1.9em;
    filter: invert(100%) sepia(4%) saturate(7462%) hue-rotate(270deg) brightness(121%) contrast(94%);
    transform: rotateX(180deg);
  }

  .active {
    transform: rotateX(360deg);
  }
`;

const Dropdown = ({ contentObj, index, headerCallback, sectionCallback }) => {

  // Render either sections or data (sections are clickable, data is not)
  const renderContent = () => {
    if (contentObj.visible) {
      if (contentObj.sections &&contentObj.sections.length === 1) { // Render section differently 
        return contentObj.sections.map((section, index) => 
                            <DropdownSection 
                              key={index} 
                              section={section} 
                              sectionCallback={sectionCallback}
                              flag={true} />)
      } else if ('data' in contentObj) { // Render data
        return contentObj.data.map((section, index) => 
                            <DropdownData 
                              key={index} 
                              section={section} 
                              sectionCallback={sectionCallback} />)
      } else { // Render section normally
        return contentObj.sections.map((section, index) => 
                            <DropdownSection 
                              key={index} 
                              section={section} 
                              sectionCallback={sectionCallback} />)
      }
    }
    return null;
  };

  return (
    <Container>
      <div onClick={headerCallback.bind(null, index)} className="header-wrapper">
        <span className="header">{contentObj.header}</span>
        <img className={contentObj.visible ? "header-icon active" : "header-icon"} src={ArrowDownSVG} alt="dropdown" />
      </div>
      {renderContent()}
    </Container>
  );
};

export default Dropdown;
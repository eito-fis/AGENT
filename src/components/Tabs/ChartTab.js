import React, { useContext, useRef, useEffect } from 'react';
import Dropdown from '../DropDown/Dropdown';
import { usePopulate } from '../../hooks/usePopulate';
import DropdownContainer from '../DropDown/DropdownContainer';
import { handleDropdownHeaderClick } from '../../helper/handleDropdownHeaderClick';
import { CurrentState } from "../../context/CurrentState";
import { renderMetrics } from "../../backend/graph";
import styled from 'styled-components';

const DivContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InnerDivContainer = styled.div`
  margin-left: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

const ChartTab = () => {

  // Context state
  const { agents, training } = useContext(CurrentState);

  // Div referring to 'Losses'
	const divRef1 = useRef(null);

  // Div referring to 'Reward'
  const divRef2 = useRef(null);

  // Div referring to 'Average Loss'
	const divRef3 = useRef(null);

  // Div referring to 'Average Reward'
  const divRef4 = useRef(null);

  let dropdownContentArr = [
    {
      header: 'Metrics',
      sections: agents ? Object.keys(agents.metrics) : [],
    }
  ];

  // On component mount, render graphs if training button has been hit
  useEffect(() => {

    let timeout;

    const render = () => {
      if (training) {
        renderMetrics(agents, 'Losses', divRef1);
        renderMetrics(agents, 'Reward', divRef2);
        renderMetrics(agents, 'Moving Average Loss', divRef3);
        renderMetrics(agents, 'Moving Average Reward', divRef4);

        // Render graphs every 3 seconds
        timeout = setTimeout(render.bind(null), 3000);
      }
    }

    render();

    return () => {
      clearTimeout(timeout);
    }
  }, [training, agents]);

  const [ dropdownVisibleArr, setDropdownVisibleArr ] = usePopulate(dropdownContentArr, true, 'visible');

  // When user clicks on dropdown section => TO-DO
  const handleDropdownSectionClick = (metric) => {
    if (training) {
      if (metric === 'Losses') {
        renderMetrics(agents, metric, divRef1);
      } else {
        renderMetrics(agents, metric, divRef2);
      }
    }
  };

  return (
    <>
      <DropdownContainer>
        {dropdownContentArr.map((dropdownContent, index) => 
          <Dropdown 
            key={index} 
            contentObj={dropdownContent} 
            index={index} 
            headerCallback={handleDropdownHeaderClick.bind(null, dropdownVisibleArr, setDropdownVisibleArr)} 
            sectionCallback={handleDropdownSectionClick} />)}
      </DropdownContainer>
      <DivContainer>
        <InnerDivContainer>
          <h1>Losses</h1>
          <div ref={divRef1}></div>
        </InnerDivContainer>
        <InnerDivContainer>
          <h1>Reward</h1>
          <div ref={divRef2}></div>
        </InnerDivContainer>
        <InnerDivContainer>
          <h1>Moving Average Loss</h1>
          <div ref={divRef3}></div>
        </InnerDivContainer>
        <InnerDivContainer>
          <h1>Moving Average Reward</h1>
          <div ref={divRef4}></div>
        </InnerDivContainer>
      </DivContainer>
    </>
  );
};

export default ChartTab;

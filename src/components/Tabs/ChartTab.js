import React, { useContext, useRef } from 'react';
import Dropdown from '../DropDown/Dropdown';
import { usePopulate } from '../../hooks/usePopulate';
import DropdownContainer from '../DropDown/DropdownContainer';
import Environment from '../Environment';
import { handleDropdownHeaderClick } from '../../helper/handleDropdownHeaderClick';
import { CurrentState } from "../../context/CurrentState";
import { renderMetrics } from "../../backend/graph";

const ChartTab = () => {
  const { envs, agents, setAgents } = useContext(CurrentState);
	const divRef = useRef(null);

  let dropdownContentArr = [
    {
      header: 'Metrics',
      sections: agents ? Object.keys(agents.metrics) : [],
    }
  ];

  const [ dropdownVisibleArr, setDropdownVisibleArr ] = usePopulate(dropdownContentArr, true, 'visible');

  // When user clicks on dropdown section => TO-DO
  const handleDropdownSectionClick = (metric) => {
    console.log(metric);
		renderMetrics(agents, metric, divRef);
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
      <Environment divRef={divRef} />
    </>
  );
};

export default ChartTab;

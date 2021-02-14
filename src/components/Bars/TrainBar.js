import React, { useContext } from 'react';
import { usePopulate } from '../../hooks/usePopulate';
import Dropdown from '../DropDown/Dropdown';
import DropdownContainer from '../DropDown/DropdownContainer';
import { handleDropdownHeaderClick } from '../../helper/handleDropdownHeaderClick';
import { CurrentState } from "../../context/CurrentState";

const TrainBar = () => {

  const { envs, setEnvs, agents, setAgents } = useContext(CurrentState);

  // Contains 'Model Status', 'Share', 'Parameters'
  let dropdownContentArr = [
    {
      header: 'Model Status',
      data: ['Training:', 'Accuracy:', 'Loss:', 'Validation Acc:', 'Validation Loss:'],
    },
  ];

  // Gives each dropdown content a 'visible' field set to true by default
  const [ dropdownVisibleArr, setDropdownVisibleArr ] = usePopulate(dropdownContentArr, true, 'visible');

  // When user clicks on dropdown section => TO-DO
  const handleDropdownSectionClick = (e) => {
    console.log(e);
  };

  const handleOnTrainClick = async () => {
    if (agents) {
      await agents.train();
    } else {
      console.log('please dont run')
    }
  };  

  return (
    <DropdownContainer>
        <button onClick={handleOnTrainClick} className="train-button">Train</button>
        {dropdownContentArr.map((dropdownContent, index) => 
          <Dropdown 
            key={index} 
            contentObj={dropdownContent} 
            index={index} 
            headerCallback={handleDropdownHeaderClick.bind(null, dropdownVisibleArr, setDropdownVisibleArr)} 
            sectionCallback={handleDropdownSectionClick} />)}
      </DropdownContainer>
  );
};

export default TrainBar;

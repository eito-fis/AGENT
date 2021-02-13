import React from 'react';
import { usePopulate } from '../hooks/usePopulate';
import Dropdown from './Dropdown';
import DropdownContainer from './DropdownContainer';
import { handleDropdownHeaderClick } from '../helper/handleDropdownHeaderClick';

const TrainBar = () => {

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

  return (
    <DropdownContainer>
        <button className="train-button">Train</button>
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
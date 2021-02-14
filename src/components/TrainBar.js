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
    {
      header: 'Share',
      sections: ['Export to Python', 'Export to Julia', 'Copy model link'],
    },
    {
      header: 'Parameters',
      sections: ['Click on a layer to view and change its parameters.'],
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
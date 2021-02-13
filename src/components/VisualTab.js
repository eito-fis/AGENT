import React from 'react';
import { usePopulate } from '../hooks/usePopulate';
import Dropdown from './Dropdown';
import DropdownContainer from './DropdownContainer';
import Environment from './Environment';
import { handleDropdownHeaderClick } from '../helper/handleDropdownHeaderClick';

const VisualTab = () => {

  let dropdownContentArr = [
    {
      header: 'Classes',
      sections: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
  ];

  const [ dropdownVisibleArr, setDropdownVisibleArr ] = usePopulate(dropdownContentArr, true, 'visible');

  // When user clicks on dropdown section => TO-DO
  const handleDropdownSectionClick = (e) => {
    console.log(e);
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
      <Environment />
    </>
  );
};

export default VisualTab;
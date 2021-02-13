import React from 'react';
import Dropdown from '../DropDown/Dropdown';
import { usePopulate } from '../../hooks/usePopulate';
import DropdownContainer from '../DropDown/DropdownContainer';
import Environment from '../Environment';
import { handleDropdownHeaderClick } from '../../helper/handleDropdownHeaderClick';

const ChartTab = () => {

  let dropdownContentArr = [
    {
      header: 'Optimizers',
      sections: ['SGD', 'RMSSprop', 'Adagrad', 'Adam'],
    }
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

export default ChartTab;
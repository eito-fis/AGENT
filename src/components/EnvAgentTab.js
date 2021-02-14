import React from 'react';
import { usePopulate } from '../hooks/usePopulate';
import Dropdown from './Dropdown';
import DropdownContainer from './DropdownContainer';
import Environment from './Environment';
import { handleDropdownHeaderClick } from '../helper/handleDropdownHeaderClick';

const EnvAgentTab = () => {

  // Contains 'Layers', 'Activations', 'Templates'
  let dropdownContentArr = [
    {
      header: 'Layers',
      sections: ['Dense', 'Convolution', 'Max Pooling', 'More'],
    },
    {
      header: 'Activations',
      sections: ['ReLU', 'Sigmoid', 'Tanh'],
    },
    {
      header: 'Templates',
      sections: ['Blank', 'Default', 'ResNet'],
    },
  ];

  // Gives each dropdown content a 'visible' field set to true by default
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

export default EnvAgentTab;

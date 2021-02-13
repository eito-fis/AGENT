import React, { useState } from 'react'
import styled from 'styled-components';
import ArrowDownSVG from '../images/Arrow-down.svg';

const ChartTabContainer = styled.div`
  background-color: rgb(229, 229, 252);
  width: 13rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartTab = () => {

  const [visibleDropdown, setVisibleDropdown] = useState([false, false, false]);

  const handleDropdownSelect = (index) => {
    const newVisibleDropdown = [...visibleDropdown];
    newVisibleDropdown[index] = !newVisibleDropdown[index];
    setVisibleDropdown(newVisibleDropdown);
  };

  const tabsArr = [
    {
      name: 'Layers',
      layerNamesArr: ['Dense', 'Convolution', 'Max Pooling', 'More'],
      visible: visibleDropdown[0],
    },
    {
      name: 'Activations',
      layerNamesArr: ['ReLU', 'Sigmoid', 'Tanh'],
      visible: visibleDropdown[1],
    },
    {
      name: 'Templates',
      layerNamesArr: ['Blank', 'Default', 'ResNet'],
      visible: visibleDropdown[2],
    },
  ];

  return (
      <ChartTabContainer>
          {tabsArr.map((tab, index) => <ChartTabDropdown key={index} tab={tab} index={index} handleDropdownSelect={handleDropdownSelect} />)}
      </ChartTabContainer>
  );
};

const ChartTabDropdownContainer = styled.div`
  margin-top: 10px;

  .tab-name-wrapper {
    background-color: #555555;
    height: 35px;
    width: 10em;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .tab-name {
    font-size: 1.3em;
    color: white;
  }

  .dropdown-icon {
    transform: translate(0, 10%);
    width: 1.9em;
    filter: invert(100%) sepia(4%) saturate(7462%) hue-rotate(270deg) brightness(121%) contrast(94%);
  }
`;

const ChartTabDropdown = ({ tab, index, handleDropdownSelect }) => {

  return (
    <ChartTabDropdownContainer>
      <div onClick={handleDropdownSelect.bind(null, index)} className="tab-name-wrapper">
        <span className="tab-name">{tab.name}</span>
        <img className="dropdown-icon" src={ArrowDownSVG} alt="dropdown" />
      </div>
      {tab.visible ? tab.layerNamesArr.map((layerName, index) => <ChartTabDropdownLayers key={index} layerName={layerName} />) : null}
    </ChartTabDropdownContainer>
  );
};

const ChartTabDropdownLayersContainer = styled.div`
  height: 30px;
  width: 90%;
  padding: 10px 10px 0;
  border-bottom: 1px solid black;
  cursor: pointer;

  .layer-name {
    width: 60%;
  }

  :hover {
    background-color: lightgrey;
  }
`;

const ChartTabDropdownLayers = ({ layerName }) => {

  return (
    <ChartTabDropdownLayersContainer>
      <span className="layer-name">{layerName}</span>
    </ChartTabDropdownLayersContainer>
  );
};

export default ChartTab;
import React, { useContext, useRef, useState, useEffect } from 'react';
import Environment from '../Environment';
import Dropdown from '../DropDown/Dropdown';
import { usePopulate } from '../../hooks/usePopulate';
import { CurrentState } from "../../context/CurrentState";
import DropdownContainer from '../DropDown/DropdownContainer';
import { handleDropdownHeaderClick } from '../../helper/handleDropdownHeaderClick';
import { SharingContext } from '../../context/SharingContext';
import * as tf from '@tensorflow/tfjs';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 20rem;
`;

const VisualTab = () => {

  const canvasRef = useRef(null);
  const [ renderingContext, setRenderingContext ] = useState(null);

  // Get canvas context
  useEffect(() => {
    const context2d = canvasRef.current.getContext("2d");
    setRenderingContext(context2d);
  }, []);

  const { envs, agents, setAgents } = useContext(CurrentState);

  let dropdownContentArr = [
    {
      header: 'Controls',
      sections: ['Run', 'Reset'],
    }
  ];

  const [ dropdownVisibleArr, setDropdownVisibleArr ] = usePopulate(dropdownContentArr, true, 'visible');

  // When user clicks on dropdown section => TO-DO
  const handleDropdownSectionClick = async (item, e) => {
    const length = agents.loggedStates.length;
    console.log('length:', length)
    let states = agents.loggedStates[length - 1];
    console.log('States:', states)
    for (let i = 0; i < states.length; i++) {
      console.log('State:', states[i])
      envs.renderState(states[i], renderingContext);
      await tf.nextFrame();
    }
  };

  return (

    <SharingContext.Provider value={renderingContext}>
      <DropdownContainer>
        {dropdownContentArr.map((dropdownContent, index) => 
          <Dropdown 
            key={index} 
            contentObj={dropdownContent} 
            index={index} 
            headerCallback={handleDropdownHeaderClick.bind(null, dropdownVisibleArr, setDropdownVisibleArr)} 
            sectionCallback={handleDropdownSectionClick} />)}
      </DropdownContainer>
      <Environment canvasRef={canvasRef} />
    </SharingContext.Provider>
  );
};

export default VisualTab;
import React, { useContext, useRef, useState, useEffect } from 'react';
import Dropdown from '../DropDown/Dropdown';
import { usePopulate } from '../../hooks/usePopulate';
import { CurrentState } from "../../context/CurrentState";
import DropdownContainer from '../DropDown/DropdownContainer';
import { handleDropdownHeaderClick } from '../../helper/handleDropdownHeaderClick';
import { SharingContext } from '../../context/SharingContext';
import * as tf from '@tensorflow/tfjs';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  flex: 1;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Canvas = styled.canvas`
  width: 90%;
  padding: 4rem 8rem;
  border: 3px solid #333333;
  border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
  background: #ffffff;
  position: relative;
  box-shadow: 10px 10px 10px black;

  &::before {
    content: '';
    border: 2px solid #353535;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
    border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
  }
`;

const VisualTab = () => {

  // Canvas reference (DOM)
  const canvasRef = useRef(null);

  // Canvas context state
  const [ renderingContext, setRenderingContext ] = useState(null);

  /*
  // Get canvas context
  useEffect(() => {
    const context2d = canvasRef.current.getContext("2d");
    setRenderingContext(context2d);
  }, []);
  */

  // Get context state
  const { envs, agents, training } = useContext(CurrentState);

  let dropdownContentArr = [
    {
      header: 'Controls',
      sections: ['Run'],
    }
  ];

  const [ dropdownVisibleArr, setDropdownVisibleArr ] = usePopulate(dropdownContentArr, true, 'visible');

  // When user clicks on dropdown section => render Cartpole
  const handleDropdownSectionClick = async (item, e) => {
    if (training) {
      const length = agents.loggedStates.length;
      let states = agents.loggedStates[length - 1];
      console.log('States:', states)
      for (let i = 0; i < states.length; i++) {
        console.log('State:', states[i])
        envs.renderState(states[i], renderingContext);
        await tf.nextFrame();
      }
    }
  };

  // On component mount, render visuals
  useEffect(() => {

    const render = async () => {

      // If canvas context doesn't exist, get it
      let context2d = renderingContext;
      if (!renderingContext) {
        context2d = canvasRef.current.getContext("2d");
        setRenderingContext(context2d);
      }

      // If training button has been hit, render visuals
      if (training) {
        const length = agents.loggedStates.length;
        let states = agents.loggedStates[length - 1];
        console.log('States:', states)
        for (let i = 0; i < states.length; i++) {
          console.log('State:', states[i])
          envs.renderState(states[i], context2d);
          await tf.nextFrame();
        }
      }
    }

    render();
  }, [training, agents, envs, renderingContext])

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
      <CanvasContainer>
        <Canvas ref={canvasRef}></Canvas>
      </CanvasContainer>
    </SharingContext.Provider>
  );
};

export default VisualTab;
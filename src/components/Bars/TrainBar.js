import React, { useContext, useState } from 'react';
import { usePopulate } from '../../hooks/usePopulate';
import Dropdown from '../DropDown/Dropdown';
import DropdownContainer from '../DropDown/DropdownContainer';
import { handleDropdownHeaderClick } from '../../helper/handleDropdownHeaderClick';
import { CurrentState } from "../../context/CurrentState";
import styled from 'styled-components';
import Loader from '../Loader/Loader';

const TrainButton = styled.button`
  margin-top: 20px;
  background-color: #447344;
  padding: 10px 65px;
  font-size: 1.4rem;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all .2s;

  :hover {
    background-color: #2f502f;
    transform: translateY(-3px);
  }

  :active, :focus {
    outline: none;
  }

  :active {
    transform: translateY(-1px);
  }
`;

const DisabledButton = styled.button`
  margin-top: 20px;
  background-color: #447344;
  opacity: 0.65;
  padding: 10px 65px;
  font-size: 1.4rem;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;

  :active, :focus {
    outline: none;
  }
`;

const TrainBar = () => {

  // Loader boolean
  const [ showLoader, setShowLoader ] = useState(false);

  // Get agents state
  const { envs, agents, setTraining } = useContext(CurrentState);

  // Contains 'Model Status' (TO-DO - add data?)
  let dropdownContentArr = [
    {
      header: 'Model Status',
      data: ['Training:', 'Accuracy:', 'Loss:', 'Validation Acc:', 'Validation Loss:'],
    },
  ];

  // Gives each dropdown content a 'visible' field set to true by default
  const [ dropdownVisibleArr, setDropdownVisibleArr ] = usePopulate(dropdownContentArr, true, 'visible');

  // User hits 'Train' button
  const handleOnTrainClick = async () => {
    if (agents) {
      setTraining(true);
      setShowLoader(true);
      await agents.train();
    }
  };

  return (
    <>
      { showLoader ? <Loader text={"Loading"} setShowLoader={setShowLoader} /> : null}
      <DropdownContainer>
        {envs && agents ? <TrainButton onClick={handleOnTrainClick}>Train</TrainButton> : <DisabledButton>Train</DisabledButton>}
        {dropdownContentArr.map((dropdownContent, index) => 
          <Dropdown 
            key={index} 
            contentObj={dropdownContent} 
            index={index} 
            headerCallback={handleDropdownHeaderClick.bind(null, dropdownVisibleArr, setDropdownVisibleArr)} />)}
      </DropdownContainer>
    </>
  );
};

export default TrainBar;

import React, { useContext, useState, useEffect } from "react";
import { usePopulate } from "../../hooks/usePopulate";
import Dropdown from "../DropDown/Dropdown";
import DropdownContainer from "../DropDown/DropdownContainer";
import { handleDropdownHeaderClick } from "../../helper/handleDropdownHeaderClick";
import { CurrentState } from "../../context/CurrentState";
import styled from "styled-components";
import Loader from "../Loader/Loader";

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
  transition: all 0.2s;

  :hover {
    background-color: #2f502f;
    transform: translateY(-3px);
  }

  :active,
  :focus {
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

  :active,
  :focus {
    outline: none;
  }
`;

const TrainBar = () => {
  // Loader boolean
  const [showLoader, setShowLoader] = useState(false);

  const [data, setData] = useState([
    "Losses: ",
    "Reward: ",
    "Av Loss: ",
    "Av Reward: ",
  ]);
  // Get agents state
  const { envs, agents, setTraining, training } = useContext(CurrentState);

  // Contains 'Model Status' (TO-DO - add data?)
  let dropdownContentArr = [
    {
      header: "Model Status",
      data: data,
    },
  ];

  // Gives each dropdown content a 'visible' field set to true by default
  const [dropdownVisibleArr, setDropdownVisibleArr] = usePopulate(
    dropdownContentArr,
    true,
    "visible"
  );

  // User hits 'Train' button
  const handleOnTrainClick = async () => {
    if (agents) {
      setTraining(true);
      setShowLoader(true);
      await agents.train();
    }
  };

  useEffect(() => {
    let timeout;
    const render = () => {
      if (training) {
        let newList = [];
        const Losses = agents.metrics["Losses"][
          agents.metrics["Losses"].length - 1
        ]
          ? "Losses: " +
            parseFloat(
              agents.metrics["Losses"][
                agents.metrics["Losses"].length - 1
              ].toString()
            ).toFixed(2)
          : "Losses: ";
        const Reward = agents.metrics["Reward"][
          agents.metrics["Reward"].length - 1
        ]
          ? "Reward: " +
            parseFloat(
              agents.metrics["Reward"][
                agents.metrics["Reward"].length - 1
              ].toString()
            ).toFixed(2)
          : "Reward: ";
        const AvLoss = agents.metrics["Moving Average Loss"][
          agents.metrics["Moving Average Loss"].length - 1
        ]
          ? "Av Loss: " +
            parseFloat(
              agents.metrics["Moving Average Loss"][
                agents.metrics["Moving Average Loss"].length - 1
              ].toString()
            ).toFixed(2)
          : "Av Loss: ";
        const AvReward = agents.metrics["Moving Average Reward"][
          agents.metrics["Moving Average Reward"].length - 1
        ]
          ? "Av Reward: " +
            parseFloat(
              agents.metrics["Moving Average Reward"][
                agents.metrics["Moving Average Reward"].length - 1
              ].toString()
            ).toFixed(2)
          : "Av Reward: ";
        newList.push(Losses);
        newList.push(Reward);
        newList.push(AvLoss);
        newList.push(AvReward);
        setData(newList);
        timeout = setTimeout(render.bind(null), 3000);
      }
    };

    render();

    return () => {
      clearTimeout(timeout);
    };
  }, [training, agents]);

  return (
    <>
      {showLoader ? (
        <Loader text={"Loading"} setShowLoader={setShowLoader} />
      ) : null}
      <DropdownContainer>
        {envs && agents ? (
          <TrainButton onClick={handleOnTrainClick}>Train</TrainButton>
        ) : (
          <DisabledButton>Train</DisabledButton>
        )}
        {dropdownContentArr.map((dropdownContent, index) => (
          <Dropdown
            key={index}
            contentObj={dropdownContent}
            index={index}
            headerCallback={handleDropdownHeaderClick.bind(
              null,
              dropdownVisibleArr,
              setDropdownVisibleArr
            )}
          />
        ))}
      </DropdownContainer>
    </>
  );
};

export default TrainBar;

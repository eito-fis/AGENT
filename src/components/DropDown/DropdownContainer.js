import styled from 'styled-components';

// Holds multiple Dropdown components
const DropdownContainer = styled.div`
  background-color: rgb(229, 229, 252);
  width: 13rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .train-button {
    margin-top: 20px;
    background-color: #447344;
    padding: 10px 65px;
    font-size: 1.4rem;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    :hover {
      background-color: #00008b;
    }

    :active, :focus {
      outline: none;
    }
  }
`;

export default DropdownContainer;
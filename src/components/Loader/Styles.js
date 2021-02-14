import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-top: 80px;
  color: #FFF;
  text-transform: uppercase;
  display: block;
  font-size: 60px;
  font-weight: 600;
  letter-spacing: 30px;
  backface-visibility: hidden;
`;

const Bars = styled.div`
  margin-top: 5px;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    transform: translateX(-18px);
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #FFF;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }

  div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }

  div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }

  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%, 100% {
      top: 24px;
      height: 32px;
    }
  }
`;

export {
  Background,
  Header,
  Bars,
};
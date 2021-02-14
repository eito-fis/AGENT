import React, { useEffect } from 'react';
import { Background, Header, Bars } from './Styles';

const Loader = ({ text, setShowLoader }) => {

  // Closes itself in 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    }
  }, [setShowLoader])

  return (
    <Background>
      <Header>{text}</Header>
      <Bars>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
      </Bars>
    </Background>
  );
};

export default Loader;
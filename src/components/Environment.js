import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SharingContext } from '../context/SharingContext';

const Container = styled.div`
  flex: 1;
`;

const Environment = ({divRef}) => {

  const canvasRef = useRef(null);
  const [ renderingContext, setRenderingContext ] = useState(null);
  
  useEffect(() => {
    const context2d = canvasRef.current.getContext("2d");
    setRenderingContext(context2d);
  }, []);


  return (
    <SharingContext.Provider value={renderingContext}>
      <Container>
				<div ref={divRef}></div>
        <canvas ref={canvasRef} />
      </Container>
    </SharingContext.Provider>
  );
};

export default Environment;

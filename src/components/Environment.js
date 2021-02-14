import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
`;

const Environment = ({ divRef, canvasRef }) => {

  return (
    <>
      <Container>
				<div ref={divRef}></div>
        <canvas ref={canvasRef} />
      </Container>
    </>
  );
};

export default Environment;

import React from 'react';
import srcbg from '../img/bg.jpg';
import styled from 'styled-components';
import { useStyles } from '../css/globalcss';
import '../App.css';

const Hero = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* Make the container full height */
  display: flex;

  justify-content:center;
  align-items: flex-start;
  overflow: hidden;
  background-color:#dfa3ff14;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${srcbg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;

    opacity: 1; 
  }
`;

const Box = styled.div`
  position: relative; 
  width:67%;
  margin-top:60px;
  margin-left:120px;
  display: flex;
  align-items:center;
  flex-direction: column;
  justify-content: center;
  color: #1e201e;
  z-index: 2; 

  h1, h2 {
    font-family: "Recursive", sans-serif;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
  }

  h2 {
    font-size: 2.5rem !important;
    font-weight: 600;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    opacity: .7;
  }
`;

const ButtonContext = styled.div`
  display: flex;
  height: 100%;
  margin-top: 50px;
  align-items: flex-end;
  gap: 10px;
`;

const FrontPage = () => {
  const styles = useStyles();
  return (
    <Hero className='hero'>
      <Box>
        <h2>pcp</h2>
        <h1>Complaint Information System</h1>
      </Box>
    </Hero>
  );
};

export default FrontPage;

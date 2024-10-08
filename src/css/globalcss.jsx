// StyleContext.js
import React, { createContext, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';


// Define the default styles using styled-components
const defaultStyles = {
  container: styled.div`
    background-color: #f5f5f5;
    border-radius: 8px;
    width: 50vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `,
  formHeading: styled.h1`
    padding:12px;
    box-sizing:border-box;
    text-align:start;
    width:90%;
    margin-bottom: 1rem;
    font-weight: bold;
    color: gray;
    fontSize: 1.5rem;
  `,
  icon: styled.div`
    margin-right: 0.5rem;
    color: #007BFF;
  `,
  inputField: styled.div`
    width: 100%;
    margin-bottom: 1rem;
  `,
  button: styled.button`
    background-color: #007BFF;
    color: white;
    width: 100%;
    &:hover {
      background-color: #0056b3;
    }
  `,
};

// Create a context with the default styles
const StyleContext = createContext(defaultStyles);

// Create a custom hook to use the StyleContext
export const useStyles = () => {
  return useContext(StyleContext);
};

// Create a provider component
export const StyleProvider = ({ children }) => {
  return (
    <StyleContext.Provider value={defaultStyles}>
      {children}
    </StyleContext.Provider>
  );
};

// Create a global style component
export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial, sans-serif';
    background-color: #e0f7fa;
    margin: 0;
    padding: 0;
  }
`;

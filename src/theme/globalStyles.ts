import { createGlobalStyle } from "styled-components";
import { DeviceSizes } from "../models/enums";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: ${({ theme }) => theme.bodyFont};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  html {
    font-size: 100%;  
  }

  @media (max-width: ${DeviceSizes.MOBILE_LARGE}) {
    html {
      font-size: 70%;  
    }
  }

  @media (max-width: ${DeviceSizes.MOBILE_MEDIUM}) {
    html {
      font-size: 60%; 
    }
  }
`;

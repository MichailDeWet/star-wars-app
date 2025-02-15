import { createGlobalStyle } from "styled-components";

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
`;

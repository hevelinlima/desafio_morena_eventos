import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    :focus{
      outline: 0;
      box-shadow: 0 0 2px black;
    }

    body{
      background-color: #f5f5f5;
      -webkit-font-smoothing: antialiased;
      font-family: "Jost", sans-serif;
      line-height: 1.2;
    }
  }
`;
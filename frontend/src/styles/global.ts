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

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f5f5f5;
      }

      &::-webkit-scrollbar-thumb {
        background: #808080;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:active {
        background: #303030;
      }  
    }
  }
`;
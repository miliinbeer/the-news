import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 body {
  * {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
  }
  a {
    text-decoration: none;
  }
 }
`;

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 10px;
`;

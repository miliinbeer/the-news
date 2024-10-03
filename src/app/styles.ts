import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 body {
  * {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
  }
 }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 auto;
`;

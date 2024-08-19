import styled from "styled-components";

export const Cards = styled.div`
  margin: 25px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 0));
  row-gap: 10px;
  justify-content: space-between;
  @media (max-width: 1000px) {
    justify-content: center;
    gap: 10px;
    row-gap: 10px;
  }
`;

export const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Error = styled.div`
  padding: 20px;
  border: 4px red solid;
`;
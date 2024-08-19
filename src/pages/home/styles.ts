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

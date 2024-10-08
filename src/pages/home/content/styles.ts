import styled from "styled-components";

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  justify-content: center;
  gap: 20px;
  @media (max-width: 1000px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const ScrollLoader = styled.p`
  padding: 10px 0;
  font-weight: 600;
  font-size: 20px;
`;

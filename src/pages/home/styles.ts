import styled from "styled-components";

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 950px) {
    justify-content: center;
  }
`;

export const ScrollLoader = styled.p`
  padding: 10px 0;
  font-weight: 600;
  font-size: 20px;
`;

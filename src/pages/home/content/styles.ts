import styled from "styled-components";

export const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 940px) {
    justify-content: center;
  }
`;

export const ScrollLoader = styled.p`
  padding: 10px 0;
  font-weight: 600;
  font-size: 20px;
`;

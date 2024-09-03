import styled from "styled-components";

export const Main = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: 20px 0 0 0;
`;

export const Cards = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(298px, 0));
  row-gap: 20px;
  justify-content: space-between;
  @media (max-width: 910px) {
    justify-content: center;
    gap: 10px;
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

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Descriptions = styled.div`
  margin: 5px 0 15px 10px;
  font-size: 13px;
`;

export const ErrorMessage = styled.div`
  color: red;
`;

export const Description = styled.div`
  color: #0d6efd;
`;

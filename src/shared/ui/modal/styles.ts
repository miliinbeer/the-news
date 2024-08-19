import styled from "styled-components";

export const Root = styled.div`
  margin: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
`;
export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
`;

export const Errors = styled.p`
  margin: 0;
  color: red;
`;

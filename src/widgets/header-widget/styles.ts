import styled from "styled-components";

export const Root = styled.div`
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px rgba(0, 0, 0, 0.175) solid;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

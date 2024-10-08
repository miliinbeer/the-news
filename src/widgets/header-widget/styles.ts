import styled from "styled-components";
import { IsErrorType } from "../../shared/types";

export const Root = styled.div`
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px rgba(0, 0, 0, 0.175) solid;
  border-radius: 20px;
  background-color: white;
`;

export const Logotype = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ff6c15;
  text-decoration: none;
  font-weight: 700;
  font-size: 30px;
  span {
    color: #4c7aff;
  }
  @media (max-width: 750px) {
    font-size: 20px;
  }
`;

export const Icon = styled.img`
  width: 45px;
  height: 45px;
`;

export const UserPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const Inputs = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Items = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  span {
    color: #ff6c15;
  }
`;

export const Input = styled.input<IsErrorType>`
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid ${({ isError }) => (isError ? "#ff6c15" : "#6c757d")};
  background-color: ${({ isError }) => (isError ? "pink" : "white")};
  &::placeholder {
    color: #ff6c15;
  }
`;

export const Textarea = styled.textarea<IsErrorType>`
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid ${({ isError }) => (isError ? "#ff6c15" : "#6c757d")};
  background-color: ${({ isError }) => (isError ? "pink" : "white")};
  &::placeholder {
    color: #ff6c15;
  }
`;

export const Password = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Eye = styled.img`
  cursor: pointer;
  position: absolute;
  top: 13px;
  right: 20px;
`;

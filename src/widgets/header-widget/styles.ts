import styled, { css } from "styled-components";
import { IsErrorType } from "../../shared/types";
import { theme } from "../../shared/helpers";

export const Root = styled.div`
  margin: 20px 0;
  padding: 10px;
  ${({ theme }) =>
    css`
      ${theme.flex.contentBetween}
    `}
  border: 1px ${theme.colors.secondary} solid;
  border-radius: 20px;
  background-color: white;
`;

export const Logotype = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${theme.colors.error};
  text-decoration: none;
  font-weight: 700;
  font-size: 30px;
  span {
    color: ${theme.colors.primary};
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
  ${({ theme }) =>
    css`
      ${theme.flex.contentBetween}
    `}
  gap: 5px;
`;

export const Inputs = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Items = styled.div`
  ${({ theme }) =>
    css`
      ${theme.flex.contentBetween}
    `}
`;
export const Label = styled.label`
  ${({ theme }) =>
    css`
      ${theme.flex.directionColumn}
    `}
  span {
    color: ${theme.colors.error};
  }
`;

export const Input = styled.input<IsErrorType>`
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid
    ${({ isError }) =>
      isError ? `${theme.colors.error}` : `${theme.colors.secondary}`};
  &::placeholder {
    color: ${theme.colors.error};
  }
  &:focus {
    outline: none;
  }
`;

export const Textarea = styled.textarea<IsErrorType>`
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid
    ${({ isError }) =>
      isError ? `${theme.colors.error}` : `${theme.colors.secondary}`};
  &::placeholder {
    color: ${theme.colors.error};
  }
`;

export const Description = styled.div`
  padding-left: 10px;
  height: 20px;
  color: ${theme.colors.error};
  font-size: 15px;
`;

export const Password = styled.div`
  position: relative;
  ${({ theme }) =>
    css`
      ${theme.flex.directionColumn}
    `}
`;

export const Eye = styled.img`
  cursor: pointer;
  position: absolute;
  top: 13px;
  right: 20px;
`;

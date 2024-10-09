import styled, { css } from "styled-components";
import { theme } from "../../../shared/helpers";

export const Root = styled.div`
  height: 100vh;
  color: ${theme.colors.primary};
  ${({ theme }) => css`${theme.flex.contentCenter}`}
  span {
    color: ${theme.colors.error};
  }
`;

export const Items = styled.div`
  ${({ theme }) => css`${theme.flex.itemsCenter}`}
  gap: 20px;
`;

export const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

export const Message = styled.p`
  font-size: 20px;
`;

import styled, { css } from "styled-components";
import { theme } from "../../helpers";

export const Container = styled.div`
  height: 100vh;
  ${({ theme }) => css`${theme.flex.contentCenter}`}
  
`;

export const Reload = styled.div`
  border-width: 0.6rem;
  border-style: solid;
  border-color: ${theme.colors.primary};
  width: 5.625rem;
  height: 5.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${theme.colors.primary};
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

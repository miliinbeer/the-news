import styled, { css } from "styled-components";
import { theme } from "../../shared/helpers";

export const Items = styled.div`
  margin: 1rem 0;
  padding: 5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border: 1px ${theme.colors.secondary} solid;
  border-radius: 20px;
  @media (max-width: 750px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Avatar = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 1px red solid;
  @media (max-width: 750px) {
    width: 150px;
    height: 150px;
  }
`;

export const Item = styled.div`
  width: 100%;
  ${({ theme }) =>
    css`
      ${theme.flex.directionColumn}
    `}
  gap: 10px;
  border: 1px red solid;
`;

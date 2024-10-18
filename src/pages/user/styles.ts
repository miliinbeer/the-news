import styled, { css } from "styled-components";
import { theme } from "../../shared/helpers";

export const Root = styled.div`
  margin: 2rem 0;
`;

export const Items = styled.div`
  /* margin: 1rem 0;
  padding: 3rem 2rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 750px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  ${({ theme }) => theme.flex.contentCenter}
  color: #fff;
  font-size: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};

  /* @media (max-width: 750px) {
    width: 150px;
    height: 150px;
    font-size: 50px;
  } */
`;

export const Item = styled.div`
  margin: 2rem;
  /* padding: 1.5rem; */
  display: flex;
  gap: 20px;
  /* border: 1px ${theme.colors.secondary} solid;
  border-radius: 20px; */
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Info = styled.div`
  width: 100%;
  font-size: 15px;
  ${({ theme }) =>
    css`
      ${theme.flex.directionColumn}
    `}
  gap: 5px;
`;

export const Login = styled.p`
  font-size: 25px;
  font-weight: 700;
`;

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

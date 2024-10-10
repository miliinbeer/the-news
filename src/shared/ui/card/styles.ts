import styled, { css } from "styled-components";
import { theme } from "../../helpers";

export const Card = styled.div`
  cursor: pointer;
  max-width: 300px;
  padding: 20px;
  color: ${theme.colors.font};
  border: 1px ${theme.colors.secondary} solid;
  border-radius: 20px;
  background-color: #fff;
  transition: 0.3s all;

  &:hover {
    border: 1px ${theme.colors.primary} solid;
    transition: 0.3s all;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
`;

export const Title = styled.p`
  margin: 0.5rem 0;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
`;

export const Content = styled.p`
  width: 100%;
  height: 70px;
  word-break: break-all;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const Source = styled.a`
  cursor: pointer;
  padding: 0.5rem 0;
  color: ${theme.colors.primary};
  text-decoration: none;
  &:hover {
    color: ${theme.colors.primary_hover};
  }
`;

export const Info = styled.div`
  ${({ theme }) =>
    css`
      ${theme.flex.contentBetween}
    `}
`;

export const Author = styled.p`
  cursor: pointer;
  transition: 0.3s all;
  color: ${theme.colors.font};

  &:hover {
    color: ${theme.colors.secondary};
    transition: 0.3s all;
  }
`;

export const Form = styled.div`
  margin: -1rem 0 1rem 0;
`;

export const FormTitle = styled.p`
  margin: 0 0 1rem 0;
  font-size: 20px;
  font-weight: 600;
  word-break: break-all;
`;

export const FormText = styled.p`
  margin: 1rem 0;
  word-break: break-all;
`;

import styled, { css } from "styled-components";
import { theme } from "../../helpers";
import icon from "../../icons/like.png";

export const Like = styled.div`
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 50%;
  box-shadow: 0px 6px 16px rgb(187 187 187 / 47%);
  img {
    width: 50px;
    height: 50px;
  }
`;

export const Card = styled.div`
  cursor: pointer;
  width: 300px;
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

export const Content = styled.div`
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
  color: ${theme.colors.primary};

  &:hover {
    color: ${theme.colors.primary_hover};
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

import styled from 'styled-components';

import { theme } from '../../constans';

export const Card = styled.div`
  width: 300px;
  padding: 20px;
  color: ${theme.colors.font};
  word-break: break-all;
  border: 1px ${theme.colors.secondary} solid;
  border-radius: 20px;
  background-color: #fff;
`

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
`

export const Title = styled.p`
  margin: 0.5rem 0;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const Content = styled.p`
  cursor: pointer;
  margin: 0 0 0.5rem 0;
  width: 100%;
  height: 70px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  &:hover {
    color: ${theme.colors.primary};
  }
`

export const Source = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const Author = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const ModalTitle = styled.p`
  margin: 1rem 0;
  font-size: 20px;
  font-weight: 600;
  word-break: break-all;
`

export const ModalText = styled.p`
  margin: 1rem 0;
  word-break: break-all;
`
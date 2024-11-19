import styled from 'styled-components'

import liked from '../../shared/icons/liked.webp'

export const Cards = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 0));
    justify-content: center;
  }
`

export const ScrollLoader = styled.p`
  padding: 10px 0;
  font-weight: 600;
  font-size: 20px;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 70vh;
`

export const Like = styled.div`
  cursor: pointer;
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 50%;
  box-shadow: 0px 6px 16px rgb(187 187 187 / 47%);

  img {
    width: 50px;
    height: 50px;
  }

  &:hover::after {
    content: '';
    background-image: url(${liked});
    background-size: cover;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    left: 0;
  }
`

import styled, { css } from 'styled-components'

export const Root = styled.div`
  margin: 2rem 0;
`

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 750px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  ${({ theme }) => theme.flex.contentCenter}
  color: #fff;
  font-size: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const Item = styled.div`
  margin: 2rem;
  display: flex;
  gap: 20px;

  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Info = styled.div`
  width: 100%;
  font-size: 15px;
  ${({ theme }) =>
    css`
      ${theme.flex.directionColumn}
    `}
  gap: 5px;
`

export const Login = styled.p`
  font-size: 25px;
  font-weight: 700;
`

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 950px) {
    justify-content: center;
  }
`

export const ScrollLoader = styled.p`
  padding: 10px 0;
  font-weight: 600;
  font-size: 20px;
`

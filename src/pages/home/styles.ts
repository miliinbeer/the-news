import styled from 'styled-components'

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

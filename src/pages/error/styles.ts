import styled from 'styled-components'

import { theme } from '../../shared/constants'

export const Root = styled.div`
  margin-top: 20rem;
  color: ${theme.colors.primary};
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  span {
    color: ${theme.colors.error};
  }
`

import styled from 'styled-components'

import { theme } from '../../constants'

export const Items = styled.div`
  margin-left: 10px;
`

export const Buttons = styled.div`
  margin: 10px 0;
`

export const Avatar = styled.button`
  color: #fff;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
`

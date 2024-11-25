import styled, { css } from 'styled-components'

import { theme } from '../../shared/constants'
import { IsErrorType } from '../../shared/types'

export const Root = styled.header`
  padding: 10px 0;
  border-bottom: 1px ${theme.colors.secondary} solid;
`

export const Items = styled.div`
  ${({ theme }) =>
    css`
      ${theme.flex.contentBetween}
    `}
`

export const Logotype = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${theme.colors.primary};
  font-weight: 700;
  font-size: 25px;
  span {
    color: ${theme.colors.error};
  }
`

export const Icon = styled.img`
  width: 45px;
  height: 45px;
`

export const UserPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Label = styled.label`
  font-size: 15px;

  ${({ theme }) =>
    css`
      ${theme.flex.directionColumn}
    `}
  span {
    color: ${theme.colors.error};
  }
`

export const Input = styled.input<IsErrorType>`
  padding: 10px 10px;
  border-radius: 10px;
  border: 2px solid
    ${({ isError }) => (isError ? `${theme.colors.error}` : `${theme.colors.secondary}`)};
  &::placeholder {
    color: ${theme.colors.error};
  }
  &:focus {
    outline: none;
  }
`

export const Textarea = styled.textarea<IsErrorType>`
  padding: 10px 10px;
  border-radius: 10px;
  border: 2px solid
    ${({ isError }) => (isError ? `${theme.colors.error}` : `${theme.colors.secondary}`)};
  &::placeholder {
    color: ${theme.colors.error};
  }
`

export const Description = styled.div`
  padding: 5px 0 10px 5px;
  color: ${theme.colors.error};
  font-size: 10px;
`

export const Avatar = styled.button`
  color: #fff;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
`

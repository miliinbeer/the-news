import React, { FC } from 'react'

import { Root } from './styles'

export const ErrorPage: FC = () => {
  return (
    <Root>
      <span>Упс!</span> Что-то пошло не так...
    </Root>
  )
}

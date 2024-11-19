import React, { FC } from 'react'

import { Root } from './styles'

interface Props {
  children: React.ReactNode
}

export const PageContainer: FC<Props> = ({ children }) => {
  return <Root>{children}</Root>
}

import { ReactElement } from 'react'

import { store } from '../../app/store'

export type AppDispatch = typeof store.dispatch

export interface StatePostTypes {
  root: {
    posts: PostTypes[]
    user: UserTypes
    loading: boolean
    error: undefined
  }
}

export interface UserTypes {
  displayName: string
  email: string
  uid: string
}

export interface PostTypes {
  id?: string
  image: string
  title: string
  content: string
  link: string
  date?: string
  author?: string
  likes?: Array<string> | undefined
  isLiked?: ReactElement
}

export interface IsErrorType {
  isError: boolean
}

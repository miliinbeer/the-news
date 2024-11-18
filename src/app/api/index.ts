import { createSlice } from '@reduxjs/toolkit'

export const rootReducer = createSlice({
  name: 'data',
  initialState: {
    posts: [],
    user: {},
    error: undefined,
    loading: false,
    hasNextPage: true
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setPosts, setUser } = rootReducer.actions
export default rootReducer.reducer

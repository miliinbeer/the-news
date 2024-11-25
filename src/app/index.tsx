import 'bootstrap/dist/css/bootstrap.min.css'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { ErrorPage } from '../pages/error'
import { HomePage } from '../pages/home'
import { UserPage } from '../pages/user'
import { theme } from '../shared/constants'
import { AppDispatch } from '../shared/types'
import { setPosts, setUser } from './api'
import { auth, database } from './firebase'
import { GlobalStyles } from './styles'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: 'user/:author',
      element: <UserPage />
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ],
  {
    basename: '/the-news'
  }
)

function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(setUser(null))
      }
    })

    return () => {}
  }, [dispatch])

  useEffect(() => {
    const postsRef = ref(database, 'posts')

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const postsArray = Object.keys(data)
          .map((key) => {
            return { id: key, ...data[key] }
          })
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          })
        dispatch(setPosts(postsArray))
      }
    })

    return () => {}
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

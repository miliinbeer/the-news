import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase";
import { setPosts, setUser } from "./api";
import { onValue, ref } from "firebase/database";
import { theme } from "../shared/helpers";
import { AppDispatch, PostTypes } from "../shared/types";
import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "user/:author",
    element: <UserPage />,
  },
]);

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => {};
  }, [dispatch]);

  useEffect(() => {
    const postsRef = ref(database, "posts");

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postsArray: Array<PostTypes> = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          postsArray.push({ id: key, ...data[key] });
        });
      }

      dispatch(setPosts(postsArray));
    });

    return () => {};
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

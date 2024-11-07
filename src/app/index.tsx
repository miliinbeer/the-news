import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import base64 from "base-64";
// import { setUserLogged } from "./api";
import { theme } from "../shared/helpers";
import { AppDispatch, PostTypes } from "../shared/types";
import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase";
import { setPosts, setUser } from "./api";
import { onValue, ref } from "firebase/database";

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
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, []);

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

  // useEffect(() => {
  //   dispatch(fetchUsers());

  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     try {
  //       const tokenContent = base64.decode(token);
  //       dispatch(setUserLogged(JSON.parse(tokenContent)));
  //     } catch (err) {
  //       console.error("Ошибка", err);
  //     }
  //   }
  // }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

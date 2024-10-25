import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import base64 from "base-64";
import { fetchUsers, setUserLogged } from "./api";
import { theme } from "../shared/helpers";
import { AppDispatch } from "../shared/types";
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
    path: "user/:authorLogin",
    element: <UserPage />,
  },
]);


function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const tokenContent = base64.decode(token);
        dispatch(setUserLogged(JSON.parse(tokenContent)));
      } catch (err) {
        console.error("Ошибка", err);
      }
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

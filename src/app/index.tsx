import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { GlobalStyles, Container } from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { User } from "../pages/user";
import { ThemeProvider } from "styled-components";
import { theme } from "../shared/helpers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "user",
    element: <User />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

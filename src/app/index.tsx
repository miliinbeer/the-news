import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user";
import { ThemeProvider } from "styled-components";
import { theme } from "../shared/helpers";
import { GlobalStyles, Container } from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "user",
    element: <UserPage />,
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

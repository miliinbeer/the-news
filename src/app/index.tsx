import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { GlobalStyles, Container } from "./styles";
import { Home } from "../pages/home";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Container>
        <Home />
      </Container>
    </Provider>
  );
}

export default App;

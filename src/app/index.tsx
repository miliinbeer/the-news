import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { GlobalStyles, Container } from "./styles";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Container></Container>
    </Provider>
  );
}

export default App;

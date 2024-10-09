import React, { FC } from "react";
import { useSelector } from "react-redux";
import { theme } from "../../shared/helpers";
import { StatePostTypes } from "../../shared/types";
import { Error } from "./error";
import { Content } from "./content";
import { ThemeProvider } from "styled-components";

export const Home: FC = () => {
  const { error } = useSelector((state: StatePostTypes) => state.root);

  if (error) return <Error message={error} />;

  return (
    <ThemeProvider theme={theme}>
      <Content />
    </ThemeProvider>
  );
};

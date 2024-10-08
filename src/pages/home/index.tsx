import React, { FC } from "react";
import { useSelector } from "react-redux";
import { StatePostTypes } from "../../shared/types";
import { Error } from "./error";
import { Content } from "./content";

export const Home: FC = () => {
  const { error } = useSelector((state: StatePostTypes) => state.root);

  if (error) return <Error message={error} />;

  return (
    <>
      <Content />
    </>
  );
};

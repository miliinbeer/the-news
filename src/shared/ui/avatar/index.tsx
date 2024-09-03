import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { StatePostTypes } from "../../types";
import { Root } from "./styles";

export const Avatar: FunctionComponent = () => {
  const { user } = useSelector((state: StatePostTypes) => state.root);

  return (
    <Root>
      {user.map(
        (el) => `${el.firstname?.slice(0, 1)}${el.lastname?.slice(0, 1)}`
      )}
    </Root>
  );
};

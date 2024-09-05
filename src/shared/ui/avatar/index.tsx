import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { StatePostTypes, AvatarProps } from "../../types";
import { Root } from "./styles";

export const Avatar: FunctionComponent<AvatarProps> = ({ handleAvatar }) => {
  const { user } = useSelector((state: StatePostTypes) => state.root);

  return (
    <Root onClick={handleAvatar}>
      {user[user.length - 1].firstname?.slice(0, 1)}
      {user[user.length - 1].lastname?.slice(0, 1)}
    </Root>
  );
};

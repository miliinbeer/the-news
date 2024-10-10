import React, { FC } from "react";
import { useSelector } from "react-redux";
import { StatePostTypes, AvatarProps } from "../../types";
import { Root } from "./styles";

export const AvatarWidget: FC<AvatarProps> = ({ handleAvatar }) => {
  const { userLogged } = useSelector((state: StatePostTypes) => state.root);

  return (
    <Root onClick={handleAvatar}>
      {userLogged.firstname.slice(0, 1)}
      {userLogged.lastname.slice(0, 1)}
    </Root>
  );
};

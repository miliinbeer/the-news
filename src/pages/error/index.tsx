import React, { FC } from "react";
import { useSelector } from "react-redux";
import { StatePostTypes } from "../../shared/types";
import { Root, Items, Icon, Message } from "./styles";
import icon from "../../shared/icons/favicon.webp";

export const ErrorPage: FC = () => {
  const { error } = useSelector((state: StatePostTypes) => state.root);
  return (
    <Root>
      <Items>
        <Icon src={icon} />
        <div>
          <h1>
            404. <span>That's an error</span>
          </h1>
          <Message>{error}</Message>
        </div>
      </Items>
    </Root>
  );
};

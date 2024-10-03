import React, { FC } from "react";
import { Root, Items, Icon, Message } from "./styles";
import { ErrorProps } from "../../../shared/types";
import icon from "../../../shared/icons/favicon.webp";

export const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <Root>
      <Items>
        <Icon src={icon} />
        <div>
          <h1>
            404. <span>That's an error</span>
          </h1>
          <Message>{message}</Message>
        </div>
      </Items>
    </Root>
  );
};

import React, { FunctionComponent } from "react";
import { ModalWindow } from "../../shared/ui/modal";
import { Root, Image } from "./styles";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FunctionComponent = () => {
  return (
    <Root>
        <a href="/">
          <Image src={icon} alt="icon" />
        </a>
        <ModalWindow />
    </Root>
  );
};

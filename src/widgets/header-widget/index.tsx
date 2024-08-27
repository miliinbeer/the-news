import React, { FunctionComponent } from "react";
import {
  Button
} from "reactstrap";
import { Root, Image, Buttons } from "./styles";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FunctionComponent = () => {
  return (
    <Root>
      <a href="/">
        <Image src={icon} alt="icon" />
      </a>
      <Buttons>
        <a href="/">Вход</a>
        <Button color="primary" onClick={() => {}}>
          Регистрация
        </Button>
      </Buttons>
    </Root>
  );
};

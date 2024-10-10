import React, { FC } from "react";
import { useSelector } from "react-redux";
import { CanvasProps, StatePostTypes } from "../../types";
import { AvatarWidget } from "../avatar";
import { Items, Buttons } from "./styles";
import Offcanvas from "react-bootstrap/Offcanvas";

export const CanvasWidget: FC<CanvasProps> = ({
  showCanvas,
  handlerHide,
  placement,
  exitButton,
}) => {
  const { userLogged } = useSelector((state: StatePostTypes) => state.root);

  return (
    <Offcanvas show={showCanvas} onHide={handlerHide} placement={placement}>
      <Offcanvas.Header closeButton>
        <AvatarWidget />
        <Items>
          <strong>{userLogged.login}</strong>
          <div>
            {userLogged.firstname.charAt(0).toUpperCase() +
              userLogged.firstname.slice(1).toLowerCase()}{" "}
            {userLogged.lastname.charAt(0).toUpperCase() +
              userLogged.lastname.slice(1).toLowerCase()}
          </div>
        </Items>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illum
          fugit omnis non totam voluptate odit nemo animi corrupti est, nobis
          quos eligendi pariatur dolore velit quaerat voluptates, sapiente
          error?
        </p>
        <Buttons>{exitButton}</Buttons>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { StatePostTypes, CanvasProps } from "../../types";
import { Avatar } from "../avatar";
import { Items } from "./styles";
import Offcanvas from "react-bootstrap/Offcanvas";

export const Canvas: FunctionComponent<CanvasProps> = ({
  showCanvas,
  handlerHide,
  placement,
  exitButton,
}) => {
  const { user } = useSelector((state: StatePostTypes) => state.root);

  return (
    <Offcanvas show={showCanvas} onHide={handlerHide} placement={placement}>
      <Offcanvas.Header closeButton>
        <Avatar />
        <Items>
          <strong>{user[user.length - 1].login}</strong>
          <div>
            {user[user.length - 1].firstname} {user[user.length - 1].lastname}
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
        {exitButton}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

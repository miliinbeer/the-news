import React, { FC, ReactElement } from "react";
// import { useSelector } from "react-redux";
// import { StatePostTypes } from "../../types";
import { Items, Buttons, Avatar } from "./styles";
import Offcanvas, { OffcanvasPlacement } from "react-bootstrap/Offcanvas";
import { auth } from "../../../app/firebase";

interface Props {
  showCanvas: boolean;
  handlerHide: () => void;
  placement: OffcanvasPlacement;
  exitButton: ReactElement;
}

export const CanvasWidget: FC<Props> = ({
  showCanvas,
  handlerHide,
  placement,
  exitButton,
}) => {
  const userInfo = auth.currentUser;

  return (
    <Offcanvas show={showCanvas} onHide={handlerHide} placement={placement}>
      <Offcanvas.Header closeButton>
        <Avatar>
          {userInfo?.displayName?.slice(0, 1)}
          {/* {userLogged?.lastname.slice(0, 1)} */}
        </Avatar>
        <Items>
          <strong>{userInfo?.email?.split("@gmail.com")}</strong>
          <div>
            {userInfo?.displayName}
            {/* {userLogged?.firstname.charAt(0).toUpperCase() +
              userLogged?.firstname.slice(1).toLowerCase()}{" "}
            {userLogged?.lastname.charAt(0).toUpperCase() +
              userLogged?.lastname.slice(1).toLowerCase()} */}
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

import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../app/api";
import { AppDispatch, StatePostTypes } from "../../shared/types";
import { EntranceModal } from "./ui/entrance-modal";
import { RegistrationModal } from "./ui/registration-modal";
import { Avatar } from "../../shared/ui/avatar";
import { Canvas } from "../../shared/ui/canvas";
import { Button } from "reactstrap";
import { Root, Image, Buttons } from "./styles";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: StatePostTypes) => state.root);

  const [showCanvas, setShowCanvas] = useState(false);
  const [userPanel, setUserPanel] = useState(true);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const closeUserPanel = () => {
    setUserPanel(!userPanel);
  };

  return (
    <Root>
      <a href="/">
        <Image src={icon} alt="icon" />
      </a>
      {userPanel ? (
        <>
          {user.length > 0 ? (
            <>
              <Avatar handleAvatar={() => setShowCanvas(true)} />
              <Canvas
                showCanvas={showCanvas}
                handlerHide={() => setShowCanvas(false)}
                placement="end"
                exitButton={
                  <Button color="primary" onClick={closeUserPanel}>
                    Выход
                  </Button>
                }
              />
            </>
          ) : (
            <Buttons>
              <EntranceModal />
              <RegistrationModal />
            </Buttons>
          )}
        </>
      ) : (
        <Buttons>
          <EntranceModal />
          <RegistrationModal />
        </Buttons>
      )}
    </Root>
  );
};

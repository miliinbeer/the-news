import React, { FC } from "react";
import { ModalProps } from "../../types/index";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { ModalFooter } from "./styles";

export const ModalWindow: FC<ModalProps> = ({
  modalButton,
  isOpened,
  toggleModal,
  modalTitle,
  modalForm,
  modalButtons,
}) => {
  return (
    <>
      {modalButton}
      <Modal style={{marginTop: "7rem"}} isOpen={isOpened} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>
          <>{modalForm}</>
          <ModalFooter>{modalButtons}</ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};

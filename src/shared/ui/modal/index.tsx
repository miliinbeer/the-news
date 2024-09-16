import React, { FunctionComponent } from "react";
import { ModalProps } from "../../types/index";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
} from "reactstrap";

export const ModalWindow: FunctionComponent<ModalProps> = ({
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
      <Modal isOpen={isOpened} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>
          <>{modalForm}</>
          <ModalFooter>{modalButtons}</ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};

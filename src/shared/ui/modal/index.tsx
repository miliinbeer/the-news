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
  buttonVariant,
  handlerModalOpen,
  modalButtonName,
  isOpened,
  toggleModal,
  modalTitle,
  handlerAdd,
  modalForm,
  modalButtons,
}) => {
  return (
    <>
      <Button color={buttonVariant} onClick={handlerModalOpen}>
        {modalButtonName}
      </Button>
      <Modal isOpen={isOpened} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>
          <Form>{modalForm}</Form>
          <ModalFooter>{modalButtons}</ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};

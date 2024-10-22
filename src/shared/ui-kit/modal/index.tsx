import React, { FC, ReactElement } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ModalFooter } from "./styles";

interface Props {
  modalButton: ReactElement;
  isOpened: boolean;
  toggleModal: () => void;
  modalTitle?: string;
  modalForm: ReactElement;
  modalButtons?: ReactElement;
}

export const ModalWindow: FC<Props> = ({
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
      <Modal
        style={{ marginTop: "7rem" }}
        isOpen={isOpened}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal} style={{ border: "none" }}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          <>{modalForm}</>
          <ModalFooter>{modalButtons}</ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};

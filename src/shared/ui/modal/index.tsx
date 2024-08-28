import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { StateDataTypes, ModalProps } from "../../types/index";
import {
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export const ModalWindow: FunctionComponent<ModalProps> = ({
  handlerModalOpen,
  modalButtonName,
  toggleModal,
  modalTitle,
  handlerAdd,
  form,
}) => {
  const { modal } = useSelector((state: StateDataTypes) => state.root);

  return (
    <>
      <Button color="primary" onClick={handlerModalOpen}>
        {modalButtonName}
      </Button>
      <Modal
        style={{ height: "90vh", display: "flex", alignItems: "center" }}
        isOpen={modal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handlerAdd}>
            {form}
            <ModalFooter style={{ marginTop: "10px" }}>
              <Button color="primary" onClick={handlerAdd}>
                Добавить
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Отмена
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

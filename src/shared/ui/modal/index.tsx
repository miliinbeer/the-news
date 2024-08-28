import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema/schema";
import { requestPost, toggleModal } from "../../../app/api";
import { AppDispatch, StateDataTypes } from "../../types/index";
import {
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { InputWidget } from "../input";
import { Inputs } from "./styles";

export const ModalWindow: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const { modal } = useSelector((state: StateDataTypes) => state.root);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  });

  const newPost: SubmitHandler<yup.InferType<typeof schema>> = (el) => {
    dispatch(toggleModal(reset()));
    dispatch(requestPost(el));
  };

  const inputsItems = [
    {
      placeholder: "Заголовок",
      register: { ...register("title") },
      error: errors.title,
      message: errors.title?.message?.toString(),
      description: "Укажите название вашей новости",
    },
    {
      placeholder: "Изображение",
      register: { ...register("image") },
      error: errors.image,
      message: errors.image?.message?.toString(),
      description: "Добавьте URL изображения",
    },
    {
      placeholder: "Контент",
      register: { ...register("content") },
      error: errors.content,
      message: errors.content?.message?.toString(),
      description: "Дайте краткое описание",
    },
    {
      placeholder: "Ссылка",
      register: { ...register("link") },
      error: errors.link,
      message: errors.link?.message?.toString(),
      description: "Укажите ссылку на новость",
    },
  ];

  return (
    <>
      <Button color="primary" onClick={() => dispatch(toggleModal(reset()))}>
        + Добавить новость
      </Button>
      <Modal
        style={{ height: "90vh", display: "flex", alignItems: "center" }}
        isOpen={modal}
        toggle={() => dispatch(toggleModal())}
      >
        <ModalHeader toggle={() => dispatch(toggleModal())}>
          Добавить новую новость
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(newPost)}>
            <Inputs>
              {inputsItems.map((el) => (
                <InputWidget
                  placeholder={el.placeholder}
                  register={el.register}
                  error={el.error}
                  message={el.message}
                  description={el.description}
                />
              ))}
            </Inputs>
            <ModalFooter style={{ marginTop: "10px" }}>
              <Button color="primary" onClick={handleSubmit(newPost)}>
                Добавить
              </Button>
              <Button color="secondary" onClick={() => dispatch(toggleModal())}>
                Отмена
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

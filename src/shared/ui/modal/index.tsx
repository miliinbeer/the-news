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
import { Inputs, Input, Errors, Error, Description } from "./styles";

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
              <div>
                <Input placeholder="Заголовок" {...register("title")} />
                <Errors>
                  {errors?.title ? (
                    <Error>{errors.title.message?.toString()}</Error>
                  ) : (
                    <Description>Укажите название вашей новости</Description>
                  )}
                </Errors>
              </div>
              <div>
                <Input placeholder="Изображение" {...register("image")} />
                <Errors>
                  {errors.image ? (
                    <Error>{errors.image.message?.toString()}</Error>
                  ) : (
                    <Description>Добавьте URL изображения</Description>
                  )}
                </Errors>
              </div>
              <div>
                <Input placeholder="Контент" {...register("content")} />
                <Errors>
                  {errors.content ? (
                    <Error>{errors.content.message?.toString()}</Error>
                  ) : (
                    <Description>Дайте краткое описание</Description>
                  )}
                </Errors>
              </div>
              <div>
                <Input placeholder="Ссылка" {...register("link")} />
                <Errors>
                  {errors.link ? (
                    <Error>{errors.link.message?.toString()}</Error>
                  ) : (
                    <Description>Укажите ссылку на новость</Description>
                  )}
                </Errors>
              </div>
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

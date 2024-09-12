import React, { FunctionComponent, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { requestUsers } from "../../../../app/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUser } from "../../../../shared/ui/modal/schema/schema";
import { AppDispatch } from "../../../../shared/types";
import { ModalWindow } from "../../../../shared/ui/modal";
import { Button } from "reactstrap";
import {
  Description,
  Descriptions,
  ErrorMessage,
  Input,
} from "../../styles";

export const EntranceModal: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const [entranceModal, setEntranceModal] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaUser>>({
    resolver: yupResolver(schemaUser),
    defaultValues: {},
  });

  const toggleEntranceModal = () => {
    setEntranceModal(!entranceModal);
    reset();
  };

  const loginToAccount: SubmitHandler<yup.InferType<typeof schemaUser>> = (
    el
  ) => {
    dispatch(requestUsers(el));
    setEntranceModal(!entranceModal);
  };

  return (
    <>
      <ModalWindow
        buttonVariant="link"
        handlerModalOpen={toggleEntranceModal}
        modalButtonName="Вход"
        isOpened={entranceModal}
        toggleModal={toggleEntranceModal}
        modalTitle="Вход"
        modalForm={
          <>
            <Controller
              control={control}
              name="login"
              render={({ field }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Логин"
                  />
                );
              }}
            />
            <Descriptions>
              {errors.login ? (
                <ErrorMessage>{errors.login.message?.toString()}</ErrorMessage>
              ) : (
                <Description>Введите ваш логин</Description>
              )}
            </Descriptions>
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Пароль"
                  />
                );
              }}
            />
            <Descriptions>
              {errors.password ? (
                <ErrorMessage>
                  {errors.password.message?.toString()}
                </ErrorMessage>
              ) : (
                <Description>Введите пароль</Description>
              )}
            </Descriptions>
          </>
        }
        modalButtons={
          <>
            <Button color="primary" onClick={handleSubmit(loginToAccount)}>
              Добавить
            </Button>
            <Button color="secondary" onClick={toggleEntranceModal}>
              Отмена
            </Button>
          </>
        }
      />
    </>
  );
};

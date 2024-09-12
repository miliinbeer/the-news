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

export const RegistrationModal: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const [registrationModal, setRegistartionModal] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaUser>>({
    resolver: yupResolver(schemaUser),
    defaultValues: {},
  });

  const registrationToAccount: SubmitHandler<
    yup.InferType<typeof schemaUser>
  > = (el) => {
    dispatch(requestUsers(el));
    setRegistartionModal(!registrationModal);
  };

  const toggleRegistrationModal = () => {
    setRegistartionModal(!registrationModal);
    reset();
  };

  return (
    <>
      <ModalWindow
        buttonVariant="primary"
        handlerModalOpen={toggleRegistrationModal}
        modalButtonName="Регистрация"
        isOpened={registrationModal}
        toggleModal={toggleRegistrationModal}
        modalTitle="Регистрация"
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
            <Controller
              control={control}
              name="firstname"
              render={({ field }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Имя"
                  />
                );
              }}
            />
            <Descriptions>
              {errors.firstname ? (
                <ErrorMessage>
                  {errors.firstname.message?.toString()}
                </ErrorMessage>
              ) : (
                <Description>Введите ваше имя</Description>
              )}
            </Descriptions>
            <Controller
              control={control}
              name="lastname"
              render={({ field }) => {
                return (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Фамилия"
                  />
                );
              }}
            />
            <Descriptions>
              {errors.lastname ? (
                <ErrorMessage>{errors.lastname.message?.toString()}</ErrorMessage>
              ) : (
                <Description>Введите вашe фамилию</Description>
              )}
            </Descriptions>
          </>
        }
        modalButtons={
          <>
            <Button
              color="primary"
              onClick={handleSubmit(registrationToAccount)}
            >
              Добавить
            </Button>
            <Button color="secondary" onClick={toggleRegistrationModal}>
              Отмена
            </Button>
          </>
        }
      />
    </>
  );
};

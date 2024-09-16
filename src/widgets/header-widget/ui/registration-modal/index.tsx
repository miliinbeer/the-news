import React, { FunctionComponent, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { requestUsers } from "../../../../app/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegistration } from "../../../../shared/ui/modal/schema/schema";
import { AppDispatch, StatePostTypes } from "../../../../shared/types";
import { ModalWindow } from "../../../../shared/ui/modal";
import { Button } from "reactstrap";
import {
  Description,
  Descriptions,
  ErrorMessage,
  Input,
  Password,
  Eye,
} from "../../styles";
import eye from "../../../../shared/icons/eye.svg";
import eye_crossed from "../../../../shared/icons/eye-crossed.svg";

export const RegistrationModal: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const [registrationModal, setRegistartionModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaRegistration>>({
    resolver: yupResolver(schemaRegistration),
    defaultValues: {},
  });

  const { user } = useSelector((state: StatePostTypes) => state.root);

  const encodeToBase64 = (str: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let binaryString = "";
    for (let i = 0; i < data.length; i++) {
      binaryString += String.fromCharCode(data[i]);
    }
    return btoa(binaryString);
  };

  const userJSON = JSON.stringify(user);
  const encoded = require("base-64").encode(encodeToBase64(userJSON));

  const registrationToAccount: SubmitHandler<
    yup.InferType<typeof schemaRegistration>
  > = (el) => {
    dispatch(requestUsers(el));
    setRegistartionModal(!registrationModal);
    localStorage.setItem("token", encoded);
  };

  const toggleRegistrationModal = () => {
    setRegistartionModal(!registrationModal);
    reset();
  };

  return (
    <>
      <ModalWindow
        modalButton={
          <Button color="primary" onClick={toggleRegistrationModal}>
            Регистрация
          </Button>
        }
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
                  <Password>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Пароль"
                    />
                    <div onMouseDown={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Eye src={eye_crossed} />
                      ) : (
                        <Eye src={eye} />
                      )}
                    </div>
                  </Password>
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
                <ErrorMessage>
                  {errors.lastname.message?.toString()}
                </ErrorMessage>
              ) : (
                <Description>Введите вашу фамилию</Description>
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

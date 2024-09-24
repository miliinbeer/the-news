import React, { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { requestUsers, setUserLogged } from "../../../../app/api";
import base64 from "base-64";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegistration } from "../../../../shared/ui/modal/schema/schema";
import { AppDispatch, StatePostTypes } from "../../../../shared/types";
import { ModalWindow } from "../../../../shared/ui/modal";
import { Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  Description,
  Descriptions,
  ErrorMessage,
  Input,
  Password,
  Eye,
} from "../../styles";
import "react-toastify/dist/ReactToastify.css";
import eye from "../../../../shared/icons/eye.svg";
import eye_crossed from "../../../../shared/icons/eye-crossed.svg";

export const RegistrationModal: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: StatePostTypes) => state.root);

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

  const registrationToAccount: SubmitHandler<
    yup.InferType<typeof schemaRegistration>
  > = (el) => {
    const isLoginTaken = user.find((user) => user.login === el.login);

    if (isLoginTaken) {
      toast.error("Такой пользователь уже существует. Попробуйте снова.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    dispatch(requestUsers(el));
    setRegistartionModal(!registrationModal);
    const token = base64.encode(JSON.stringify(el));
    localStorage.setItem("token", token);
    dispatch(setUserLogged(el));
  };

  const toggleRegistrationModal = () => {
    setRegistartionModal(!registrationModal);
    reset();
  };

  return (
    <>
      <ToastContainer />
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

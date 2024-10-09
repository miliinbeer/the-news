import React, { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { requestUsers, setUserLogged } from "../../../../app/api";
import base64 from "base-64";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegistration } from "../../../../shared/ui/modal/schema/schema";
import { showToast } from "../../../../shared/helpers";
import { AppDispatch, StatePostTypes } from "../../../../shared/types";
import { ModalWindow } from "../../../../shared/ui/modal";
import { Button } from "reactstrap";
import { Inputs, Password, Label, Input, Description, Eye } from "../../styles";
import "react-toastify/dist/ReactToastify.css";
import eye from "../../../../shared/icons/eye.svg";
import eye_crossed from "../../../../shared/icons/eye-crossed.svg";

export const RegistrationModal: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: StatePostTypes) => state.root);

  const [registrationModal, setRegistrationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaRegistration>>({
    resolver: yupResolver(schemaRegistration),
  });

  const registrationToAccount: SubmitHandler<
    yup.InferType<typeof schemaRegistration>
  > = (el) => {
    const isLoginTaken = user.find((user) => user.login === el.login);

    if (isLoginTaken) {
      showToast("Такой пользователь уже существует. Попробуйте снова.");
      return;
    }
    dispatch(requestUsers(el));
    setRegistrationModal(!registrationModal);
    const token = base64.encode(JSON.stringify(el));
    localStorage.setItem("token", token);
    dispatch(setUserLogged(el));
  };

  const toggleRegistrationModal = () => {
    setRegistrationModal(!registrationModal);
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
          <Inputs>
            <Controller
              control={control}
              name="login"
              render={({ field }) => {
                const isError = !!errors.login;
                return (
                  <Label htmlFor="login">
                    <p>
                      Логин <span>*</span>
                    </p>
                    <Input {...field} isError={isError} name="login" />
                    <Description>
                      {isError ? errors?.login?.message : null}
                    </Description>
                  </Label>
                );
              }}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                const isError = !!errors.password;
                return (
                  <Password>
                    <Label htmlFor="password">
                      <p>
                        Пароль <span>*</span>
                      </p>
                      <Password>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          isError={isError}
                          name="password"
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <Eye src={eye_crossed} />
                          ) : (
                            <Eye src={eye} />
                          )}
                        </div>
                      </Password>
                      <Description>
                        {isError ? errors?.password?.message : null}
                      </Description>
                    </Label>
                  </Password>
                );
              }}
            />
            <Controller
              control={control}
              name="lastname"
              render={({ field }) => {
                const isError = !!errors.lastname;
                return (
                  <Label htmlFor="lastname">
                    <p>
                      Фамилия <span>*</span>
                    </p>
                    <Input {...field} isError={isError} name="lastname" />
                    <Description>
                      {isError ? errors?.lastname?.message : null}
                    </Description>
                  </Label>
                );
              }}
            />
            <Controller
              control={control}
              name="firstname"
              render={({ field }) => {
                const isError = !!errors.firstname;
                return (
                  <Label htmlFor="firstname">
                    <p>
                      Имя <span>*</span>
                    </p>
                    <Input {...field} isError={isError} name="firstname" />
                    <Description>
                      {isError ? errors?.firstname?.message : null}
                    </Description>
                  </Label>
                );
              }}
            />
          </Inputs>
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

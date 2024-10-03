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
import { toast } from "react-toastify";
import { Inputs, Password, Label, Input, Eye } from "../../styles";
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
        autoClose: 3000,
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
                  <Label>
                    <p>
                      Логин <span>*</span>
                    </p>
                    <Input
                      {...field}
                      placeholder={isError ? errors?.login?.message : ""}
                      isError={isError}
                    />
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
                    <Label>
                      <p>
                        Пароль <span>*</span>
                      </p>
                      <Password>
                        <Input
                          {...field}
                          placeholder={isError ? errors?.password?.message : ""}
                          type={showPassword ? "text" : "password"}
                          isError={isError}
                        />
                        <div onMouseDown={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <Eye src={eye_crossed} />
                          ) : (
                            <Eye src={eye} />
                          )}
                        </div>
                      </Password>
                    </Label>
                  </Password>
                );
              }}
            />
            <Controller
              control={control}
              name="firstname"
              render={({ field }) => {
                const isError = !!errors.firstname;
                return (
                  <Label>
                    <p>
                      Имя <span>*</span>
                    </p>
                    <Input
                      {...field}
                      placeholder={isError ? errors?.firstname?.message : ""}
                      isError={isError}
                    />
                  </Label>
                );
              }}
            />
            <Controller
              control={control}
              name="lastname"
              render={({ field }) => {
                const isError = !!errors.lastname;
                return (
                  <Label>
                    <p>
                      Фамилия <span>*</span>
                    </p>
                    <Input
                      {...field}
                      placeholder={isError ? errors?.lastname?.message : ""}
                      isError={isError}
                    />
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

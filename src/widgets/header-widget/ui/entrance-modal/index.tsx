import React, { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, searchUsers, setUserLogged } from "../../../../app/api";
import base64 from "base-64";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEntrance } from "../../../../shared/ui/modal/schema/schema";
import { AppDispatch, StatePostTypes } from "../../../../shared/types";
import { ModalWindow } from "../../../../shared/ui/modal";
import { Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  Description,
  Descriptions,
  ErrorMessage,
  Eye,
  Input,
  Password,
} from "../../styles";
import "react-toastify/dist/ReactToastify.css";
import eye from "../../../../shared/icons/eye.svg";
import eye_crossed from "../../../../shared/icons/eye-crossed.svg";

export const EntranceModal: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: StatePostTypes) => state.root);

  const [entranceModal, setEntranceModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaEntrance>>({
    resolver: yupResolver(schemaEntrance),
    defaultValues: {},
  });

  const toggleEntranceModal = () => {
    setEntranceModal(!entranceModal);
    reset();
  };

  const loginToAccount: SubmitHandler<
    yup.InferType<typeof schemaEntrance>
  > = async (el) => {
    await dispatch(fetchUsers());

    const foundUser = user.find((user) => user.login === el.login);

    if (!foundUser) {
      toggleEntranceModal();
      toast.error("Такого пользователя нет. Попробуйте снова.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      if (foundUser.password !== el.password) {
        toast.error("Неверный пароль. Попробуйте снова.", {
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
      } else {
        dispatch(searchUsers(foundUser));
        const token = base64.encode(JSON.stringify(foundUser));
        localStorage.setItem("token", token);
        dispatch(setUserLogged(foundUser));
        toggleEntranceModal();
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <ModalWindow
        modalButton={
          <Button color="primary" outline onClick={toggleEntranceModal}>
            Вход
          </Button>
        }
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
                <>
                  <ErrorMessage>
                    {errors.login.message?.toString()}
                  </ErrorMessage>
                </>
              ) : (
                <Description>Введите логин</Description>
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
          </>
        }
        modalButtons={
          <>
            <Button color="primary" onClick={handleSubmit(loginToAccount)}>
              Войти
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

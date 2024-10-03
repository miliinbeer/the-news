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
import { Inputs, Label, Input, Password, Eye } from "../../styles";
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
      toast.error("Такого пользователя нет. Попробуйте снова.", {
        position: "top-right",
        autoClose: 3000,
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
          autoClose: 3000,
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
          </Inputs>
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

import React, { FC,  useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers, setUserLogged } from "../../../../app/api";
import base64 from "base-64";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEntrance } from "../../../../shared/ui/modal/schema/schema";
import { showToast } from "../../../../shared/helpers";
import { AppDispatch, StatePostTypes } from "../../../../shared/types";
import { ModalWindow } from "../../../../shared/ui/modal";
import { Button } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { Inputs, Label, Input, Password, Eye, Description } from "../../styles";
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
  });

  const toggleEntranceModal = () => {
    setEntranceModal(!entranceModal);
    reset();
  };

  const loginToAccount: SubmitHandler<yup.InferType<typeof schemaEntrance>> = (
    el
  ) => {
    const foundUser = user.find((user) => user.login === el.login);

    if (!foundUser) {
      showToast("Такого пользователя нет. Попробуйте снова.");
    } else {
      if (foundUser.password !== el.password) {
        showToast("Неверный пароль. Попробуйте снова.");
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

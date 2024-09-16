import React, { FunctionComponent, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, searchUsers } from "../../../../app/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEntrance } from "../../../../shared/ui/modal/schema/schema";
import { AppDispatch, StatePostTypes } from "../../../../shared/types";
import { ModalWindow } from "../../../../shared/ui/modal";
import { Button } from "reactstrap";
import { Description, Descriptions, ErrorMessage, Eye, Input, Password } from "../../styles";
import eye from "../../../../shared/icons/eye.svg";
import eye_crossed from "../../../../shared/icons/eye-crossed.svg";

export const EntranceModal: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const [entranceModal, setEntranceModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state: StatePostTypes) => state.root);

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

  const loginToAccount: SubmitHandler<
    yup.InferType<typeof schemaEntrance>
  > = async (el) => {
    await dispatch(fetchUsers());

    const foundUser = user.find(
      (user) => user.login === el.login && user.password === el.password
    );

    if (foundUser) {
      dispatch(searchUsers(foundUser));
      localStorage.setItem("token", encoded);
      toggleEntranceModal();
    } else {
      console.log("Ошибка");
      toggleEntranceModal();
    }
  };

  return (
    <>
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
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Логин"
                />
              )}
            />
            <Descriptions>
              {errors.login ? (
                <ErrorMessage>{errors.login.message?.toString()}</ErrorMessage>
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

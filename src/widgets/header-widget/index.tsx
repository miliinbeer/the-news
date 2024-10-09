import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchUsers, requestPosts, setUserLogged } from "../../app/api";
import { schemaPost } from "../../shared/ui/modal/schema/schema";
import { AppDispatch, StatePostTypes } from "../../shared/types";
import base64 from "base-64";
import { ModalWindow } from "../../shared/ui/modal";
import { EntranceModal } from "./ui/entrance-modal";
import { RegistrationModal } from "./ui/registration-modal";
import { Avatar } from "../../shared/ui/avatar";
import { Canvas } from "../../shared/ui/canvas";
import { Button } from "reactstrap";
import {
  Root,
  Logotype,
  Icon,
  UserPanel,
  Buttons,
  Inputs,
  Label,
  Input,
  Textarea,
  Description,
} from "./styles";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user, userLogged } = useSelector(
    (state: StatePostTypes) => state.root
  );

  const [showCanvas, setShowCanvas] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const tokenContent = base64.decode(token);
        dispatch(setUserLogged(JSON.parse(tokenContent)));
        setIsLogged(true);
      } catch (err) {
        console.error("Ошибка", err);
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaPost>>({
    resolver: yupResolver(schemaPost),
  });

  const addPost: SubmitHandler<yup.InferType<typeof schemaPost>> = (el) => {
    const fullPostData = {
      ...el,
      author: userLogged.login,
    };
    dispatch(requestPosts(fullPostData));
    setAddPostModal(!addPostModal);
  };

  const toggleModal = () => {
    setAddPostModal(!addPostModal);
    reset();
  };

  return (
    <>
      <Root>
        <Logotype href="/">
          <Icon src={icon} alt="icon" />
          <div>
            <span>/ THE</span> NEWS
          </div>
        </Logotype>
        {isLogged ? (
          <>
            {user.length > 0 ? (
              <UserPanel>
                <ModalWindow
                  modalButton={
                    <Button
                      data-toplint="someValue"
                      color="primary"
                      data-tooltip="Добавить новость"
                      outline
                      onClick={toggleModal}
                    >
                      +
                    </Button>
                  }
                  isOpened={addPostModal}
                  toggleModal={toggleModal}
                  modalTitle="Добавить новую новость"
                  modalForm={
                    <Inputs>
                      <Controller
                        control={control}
                        name="title"
                        render={({ field }) => {
                          const isError = !!errors.title;
                          return (
                            <Label htmlFor="title">
                              <p>
                                Заголовок <span>*</span>
                              </p>
                              <Input
                                {...field}
                                isError={isError}
                                name="title"
                              />
                              <Description>
                                {isError ? errors?.title?.message : null}
                              </Description>
                            </Label>
                          );
                        }}
                      />
                      <Controller
                        control={control}
                        name="image"
                        render={({ field }) => {
                          const isError = !!errors.image;
                          return (
                            <Label htmlFor="image">
                              <p>
                                Изображение <span>*</span>
                              </p>
                              <Input
                                {...field}
                                isError={isError}
                                name="image"
                              />
                              <Description>
                                {isError ? errors?.image?.message : null}
                              </Description>
                            </Label>
                          );
                        }}
                      />
                      <Controller
                        control={control}
                        name="content"
                        render={({ field }) => {
                          const isError = !!errors.content;
                          return (
                            <Label htmlFor="content">
                              <p>
                                Контент <span>*</span>
                              </p>
                              <Textarea
                                {...field}
                                isError={isError}
                                rows={4}
                                name="content"
                              />
                              <Description>
                                {isError ? errors?.content?.message : null}
                              </Description>
                            </Label>
                          );
                        }}
                      />
                      <Controller
                        control={control}
                        name="link"
                        render={({ field }) => {
                          const isError = !!errors.link;
                          return (
                            <Label htmlFor="link">
                              <p>
                                Ссылка на источник <span>*</span>
                              </p>
                              <Input {...field} isError={isError} name="link" />
                              <Description>
                                {isError ? errors?.link?.message : null}
                              </Description>
                            </Label>
                          );
                        }}
                      />
                    </Inputs>
                  }
                  modalButtons={
                    <>
                      <Button color="primary" onClick={handleSubmit(addPost)}>
                        Добавить
                      </Button>
                      <Button color="secondary" onClick={toggleModal}>
                        Отмена
                      </Button>
                    </>
                  }
                />
                <Avatar handleAvatar={() => setShowCanvas(true)} />
                <Canvas
                  showCanvas={showCanvas}
                  handlerHide={() => setShowCanvas(false)}
                  placement="end"
                  exitButton={
                    <Button color="primary" onClick={handleLogout}>
                      Выход
                    </Button>
                  }
                />
              </UserPanel>
            ) : null}
          </>
        ) : (
          <Buttons>
            <EntranceModal />
            <RegistrationModal />
          </Buttons>
        )}
      </Root>
    </>
  );
};

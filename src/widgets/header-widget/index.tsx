import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { schemaPost } from "../../shared/ui-kit/modal/schema/schema";
import { StatePostTypes } from "../../shared/types";
import { v4 as uuidv4 } from "uuid";
import { ModalWindow } from "../../shared/ui-kit/modal";
import { EntranceModal } from "./ui/entrance-modal";
import { RegistrationModal } from "./ui/registration-modal";
import { CanvasWidget } from "../../shared/ui-kit/canvas";
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
  Avatar,
} from "./styles";
import icon from "../../shared/icons/favicon.webp";
import { database } from "../../app/firebase";
import { ref, set } from "firebase/database";

export const HeaderWidget: FC = () => {
  const { userLogged } = useSelector((state: StatePostTypes) => state.root);

  const [showCanvas, setShowCanvas] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);

  useEffect(() => {
    if (userLogged) {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLogged(true);
      }
    }
  }, [userLogged]);

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

  const addPost: SubmitHandler<yup.InferType<typeof schemaPost>> = async (
    el
  ) => {
    const fullPostData = { ...el, author: userLogged.login };
    const postsRef = ref(database, "posts/" + uuidv4());
    // TODO СДЕЛАТЬ МАССИВОМ
    try {
      await set(postsRef, fullPostData);
    } catch (error) {
      console.error("Пост не удалось добавить, возникла ошибка:", error);
    }
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
                          <Input {...field} isError={isError} name="title" />
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
                          <Input {...field} isError={isError} name="image" />
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
            <Avatar onClick={() => setShowCanvas(true)}>
              {userLogged?.firstname.slice(0, 1)}
              {userLogged?.lastname.slice(0, 1)}
            </Avatar>
            <CanvasWidget
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

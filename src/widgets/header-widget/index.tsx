import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchUsers, requestPosts, setUserLogged } from "../../app/api";
import { schemaPost } from "../../shared/ui/modal/schema/schema";
import { AppDispatch, StatePostTypes } from "../../shared/types";
import { ModalWindow } from "../../shared/ui/modal";
import { EntranceModal } from "./ui/entrance-modal";
import { RegistrationModal } from "./ui/registration-modal";
import { Avatar } from "../../shared/ui/avatar";
import { Canvas } from "../../shared/ui/canvas";
import { Button } from "reactstrap";
import {
  Root,
  Image,
  UserPanel,
  Buttons,
  Descriptions,
  Input,
  ErrorMessage,
  Description,
} from "./styles";
import base64 from "base-64";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector(
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
    dispatch(requestPosts(el));
    setAddPostModal(!addPostModal);
  };

  const toggleModal = () => {
    setAddPostModal(!addPostModal);
    reset();
  };

  return (
    <Root>
      <a href="/">
        <Image src={icon} alt="icon" />
      </a>
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
                  // TODO: Добавить сюда подсказку для кнопки
                }
                isOpened={addPostModal}
                toggleModal={toggleModal}
                modalTitle="Добавить новую новость"
                modalForm={
                  <>
                    <Controller
                      control={control}
                      name="title"
                      render={({ field }) => {
                        return (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Заголовок"
                          />
                        );
                      }}
                    />
                    <Descriptions>
                      {errors.title ? (
                        <ErrorMessage>
                          {errors.title.message?.toString()}
                        </ErrorMessage>
                      ) : (
                        <Description>
                          Ввведите название вашей новости
                        </Description>
                      )}
                    </Descriptions>
                    <Controller
                      control={control}
                      name="image"
                      render={({ field }) => {
                        return (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Изображение"
                          />
                        );
                      }}
                    />
                    <Descriptions>
                      {errors.image ? (
                        <ErrorMessage>
                          {errors.image.message?.toString()}
                        </ErrorMessage>
                      ) : (
                        <Description>Добавьте URL изображения</Description>
                      )}
                    </Descriptions>
                    <Controller
                      control={control}
                      name="content"
                      render={({ field }) => {
                        return (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Контент"
                          />
                        );
                      }}
                    />
                    <Descriptions>
                      {errors.content ? (
                        <ErrorMessage>
                          {errors.content.message?.toString()}
                        </ErrorMessage>
                      ) : (
                        <Description>
                          Введите краткое описание новости
                        </Description>
                      )}
                    </Descriptions>
                    <Controller
                      control={control}
                      name="link"
                      render={({ field }) => {
                        return (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Ссылка"
                          />
                        );
                      }}
                    />
                    <Descriptions>
                      {errors.link ? (
                        <ErrorMessage>
                          {errors.link.message?.toString()}
                        </ErrorMessage>
                      ) : (
                        <Description>Добавьте ссылку на новость</Description>
                      )}
                    </Descriptions>
                  </>
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
                canvasItems={<></>}
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
  );
};

import React, { useEffect, useState, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../shared/ui/modal/schema/schema";
import { fetchData, requestPost } from "../../app/api/index";
import {
  AppDispatch,
  DataTypes,
  StateDataTypes,
  InputTypes,
} from "../../shared/types";
import { HeaderWidget } from "../../widgets/header-widget";
import { CardWidget } from "../../shared/ui/card";
import { ModalWindow } from "../../shared/ui/modal";
import { Loader } from "../../shared/ui/loader";
import { Input } from "../../shared/ui/input";
import { Button } from "reactstrap";
import { Main, Cards, ErrorContainer, Error } from "./styles";
import {
  Description,
  Descriptions,
  ErrorMessage,
} from "../../shared/ui/input/styles";

export const Home: FunctionComponent = () => {
  const [modal, setModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state: StateDataTypes) => state.root
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  });

  const newPost: SubmitHandler<yup.InferType<typeof schema>> = (el) => {
    dispatch(requestPost(el));
    setModal(!modal);
  };

  const toggleModal = () => {
    setModal(!modal);
    reset();
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error)
    return (
      <ErrorContainer>
        <Error>{error}</Error>
      </ErrorContainer>
    );

  const inputsItems: Array<InputTypes> = [
    {
      placeholder: "Заголовок",
      register: register("title"),
      error: errors.title,
      message: errors.title?.message?.toString(),
      description: "Укажите название вашей новости",
    },
    {
      placeholder: "Изображение",
      register: register("image"),
      error: errors.image,
      message: errors.image?.message?.toString(),
      description: "Добавьте URL изображения",
    },
    {
      placeholder: "Контент",
      register: register("content"),
      error: errors.content,
      message: errors.content?.message?.toString(),
      description: "Дайте краткое описание",
    },
    {
      placeholder: "Ссылка",
      register: register("link"),
      error: errors.link,
      message: errors.link?.message?.toString(),
      description: "Укажите ссылку на новость",
    },
  ];

  return (
    <>
      <HeaderWidget />
      <Main>
        <ModalWindow
          buttonVariant="primary"
          handlerModalOpen={toggleModal}
          modalButtonName="+ Добавить новость"
          isOpened={modal}
          toggleModal={toggleModal}
          modalTitle="Добавить новую новость"
          handlerAdd={handleSubmit(newPost)}
          modalForm={
            <>
              {inputsItems.map((el) => (
                <Input
                  placeholder={el.placeholder}
                  register={el.register}
                  descriptions={
                    <Descriptions>
                      {el.error ? (
                        <ErrorMessage>{el.message}</ErrorMessage>
                      ) : (
                        <Description>{el.description}</Description>
                      )}
                    </Descriptions>
                  }
                />
              ))}
            </>
          }
          modalButtons={
            <>
              <Button color="primary" onClick={handleSubmit(newPost)}>
                Добавить
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Отмена
              </Button>
            </>
          }
        />
        <Cards>
          {data.map((el: DataTypes) => (
            <CardWidget
              key={el.id}
              id={el.id}
              title={el.title}
              image={el.image}
              content={el.content}
              date={el.date}
              link={el.link}
              source={el.source}
            />
          ))}
        </Cards>
      </Main>
    </>
  );
};

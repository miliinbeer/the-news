import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../shared/ui/modal/schema/schema";
import { fetchData, toggleModal, requestPost } from "../../app/api/index";
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
import { Main, Cards, ErrorContainer, Error, Inputs } from "./styles";

import { Description, Descriptions, ErrorMessage } from "../../shared/ui/input/styles";

export const Home: FunctionComponent = () => {
  const { loading, data, error } = useSelector(
    (state: StateDataTypes) => state.root
  );

  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  });

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

  const newPost: SubmitHandler<yup.InferType<typeof schema>> = (el) => {
    dispatch(toggleModal(reset()));
    dispatch(requestPost(el));
  };

  return (
    <>
      <HeaderWidget />
      <Main>
        <ModalWindow
          modalButtonName="+ Добавить новость"
          modalTitle="Добавить новую новость"
          handlerAdd={handleSubmit(newPost)}
          handlerModalOpen={() => dispatch(toggleModal(reset()))}
          toggleModal={() => dispatch(toggleModal())}
          form={
            <Inputs>
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
            </Inputs>
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

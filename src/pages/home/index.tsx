import React, {
  useEffect,
  useState,
  FunctionComponent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPost } from "../../shared/ui/modal/schema/schema";
import { fetchPosts, requestPosts } from "../../app/api/index";
import {
  AppDispatch,
  PostTypes,
  StatePostTypes,
  InputTypes,
} from "../../shared/types";
import { HeaderWidget } from "../../widgets/header-widget";
import { CardWidget } from "../../shared/ui/card";
import { ModalWindow } from "../../shared/ui/modal";
import { Loader } from "../../shared/ui/loader";
import { Input } from "../../shared/ui/input";
import { Button } from "reactstrap";
import {
  Main,
  Cards,
  ErrorContainer,
  Error,
  Description,
  Descriptions,
  ErrorMessage,
} from "./styles";

export const Home: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const [addPostModal, setAddPostModal] = useState(false);

  const { post, loading, error } = useSelector(
    (state: StatePostTypes) => state.root
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaPost>>({
    resolver: yupResolver(schemaPost),
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const addPost: SubmitHandler<yup.InferType<typeof schemaPost>> = (el) => {
    dispatch(requestPosts(el));
    setAddPostModal(!addPostModal);
  };

  const toggleModal = () => {
    setAddPostModal(!addPostModal);
    reset();
  };

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
      description: "Ввведите название вашей новости",
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
      description: "Введите краткое описание новости",
    },
    {
      placeholder: "Ссылка",
      register: register("link"),
      error: errors.link,
      message: errors.link?.message?.toString(),
      description: "Добавьте ссылку на новость",
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
          isOpened={addPostModal}
          toggleModal={toggleModal}
          modalTitle="Добавить новую новость"
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
              <Button color="primary" onClick={handleSubmit(addPost)}>
                Добавить
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Отмена
              </Button>
            </>
          }
        />
        <Cards>
          {post.map((el: PostTypes) => (
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

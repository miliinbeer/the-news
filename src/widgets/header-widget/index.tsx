import React, { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { ModalWindow } from "../../shared/ui/modal";
import { Input } from "../../shared/ui/input";
import { Button } from "reactstrap";
import { Root, Image, Buttons, Inputs } from "./styles";
import {
  Descriptions,
  ErrorMessage,
  Description,
} from "../../shared/ui/input/styles";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FunctionComponent = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  });

  const testArray: Array<any> = [
    {
      placeholder: "Введите имя",
      register: register("name"),
      error: errors.name,
      message: errors.name?.message?.toString(),
      description: "Введите ваше имя",
    },
  ];
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    reset();
  };

  return (
    <Root>
      <a href="/">
        <Image src={icon} alt="icon" />
      </a>
      <Buttons>
        <ModalWindow
          buttonVariant="link"
          handlerModalOpen={toggleModal}
          modalButtonName="Вход"
          isOpened={modal}
          toggleModal={toggleModal}
          modalTitle="Укажите ваше имя"
          handlerAdd={() => {}}
          modalForm={
            <>
              {testArray.map((el) => (
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
              <Button color="primary" onClick={() => {}}>
                Добавить
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Отмена
              </Button>
            </>
          }
        />
        <ModalWindow
          buttonVariant="primary"
          handlerModalOpen={toggleModal}
          modalButtonName="Регистрация"
          isOpened={modal}
          toggleModal={toggleModal}
          modalTitle="Укажите ваше имя"
          handlerAdd={() => {}}
          modalForm={
            <>
              {testArray.map((el) => (
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
              <Button color="primary" onClick={() => {}}>
                Добавить
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Отмена
              </Button>
            </>
          }
        />
      </Buttons>
    </Root>
  );
};

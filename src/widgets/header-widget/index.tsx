import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { ModalWindow } from "../../shared/ui/modal";
import { InputWidget } from "../../shared/ui/input";
import { Root, Image, Buttons, Inputs } from "./styles";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FunctionComponent = () => {
  const {
    register,
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
      description: "Укажите название вашей новости",
    },
  ];

  return (
    <Root>
      <a href="/">
        <Image src={icon} alt="icon" />
      </a>
      <Buttons>
        <ModalWindow
          modalButtonName="Вход"
          modalTitle="Вход"
          handlerAdd={() => {}}
          handlerModalOpen={() => {}}
          toggleModal={() => {}}
          form={
            <Inputs>
              {testArray.map((el) => (
                <InputWidget
                  placeholder={el.placeholder}
                  register={el.register}
                  error={el.error}
                  message={el.message}
                  description={el.description}
                />
              ))}
            </Inputs>
          }
        />
        <ModalWindow
          modalButtonName="Регистрация"
          modalTitle="Регистрация"
          handlerAdd={() => {}}
          handlerModalOpen={() => {}}
          toggleModal={() => {}}
          form={
            <Inputs>
              {testArray.map((el) => (
                <InputWidget
                  placeholder={el.placeholder}
                  register={el.register}
                  error={el.error}
                  message={el.message}
                  description={el.description}
                />
              ))}
            </Inputs>
          }
        />
      </Buttons>
    </Root>
  );
};

import React, {
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUser } from "../../shared/ui/modal/schema/schema";
import { fetchUsers, requestUsers } from "../../app/api";
import { AppDispatch, InputTypes, StatePostTypes } from "../../shared/types";
import { ModalWindow } from "../../shared/ui/modal";
import { Avatar } from "../../shared/ui/avatar";
import { Canvas } from "../../shared/ui/canvas";
import { Button } from "reactstrap";
import {
  Root,
  Image,
  Buttons,
  Descriptions,
  Description,
  ErrorMessage,
  Input
} from "./styles";
import icon from "../../shared/icons/favicon.webp";

export const HeaderWidget: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: StatePostTypes) => state.root);

  const [entranceModal, setEntranceModal] = useState(false);
  const [registrationModal, setRegistartionModal] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [userPanel, setUserPanel] = useState(true);
  const [value, setValue] = useState<string[]>(Array(""));

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schemaUser>>({
    resolver: yupResolver(schemaUser),
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const loginToAccount: SubmitHandler<yup.InferType<typeof schemaUser>> = (
    el
  ) => {
    dispatch(requestUsers(el));
    setEntranceModal(!entranceModal);
  };

  const registrationToAccount: SubmitHandler<
    yup.InferType<typeof schemaUser>
  > = (el) => {
    dispatch(requestUsers(el));
    setRegistartionModal(!registrationModal);
  };

  const toggleRegistrationModal = () => {
    setRegistartionModal(!registrationModal);
    reset();
  };

  const toggleEntranceModal = () => {
    setEntranceModal(!entranceModal);
    reset();
  };

  const closeUserPanel = () => {
    setUserPanel(!userPanel);
  };

  const handlerInput =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [...value];
      newValue[index] = event.target.value.trim();
      setValue(newValue);
    };

  const entranceArray: Array<InputTypes> = [
    {
      placeholder: "Логин",
      register: "login",
      error: errors.login,
      message: errors.login?.message?.toString(),
      description: "Введите ваш логин",
    },
    {
      placeholder: "Пароль",
      register: "password",
      error: errors.password,
      message: errors.password?.message?.toString(),
      description: "Введите пароль",
    },
  ];

  const registrationArray: Array<InputTypes> = [
    {
      placeholder: "Логин",
      register: "login",
      error: errors.login,
      message: errors.login?.message?.toString(),
      description: "Введите ваш логин",
    },
    {
      placeholder: "Пароль",
      register: "password",
      error: errors.password,
      message: errors.password?.message?.toString(),
      description: "Введите пароль",
    },
    {
      placeholder: "Имя",
      register: "firstname",
      error: errors.firstname,
      message: errors.firstname?.message?.toString(),
      description: "Введите ваше имя",
    },
    {
      placeholder: "Фамилия",
      register: "lastname",
      error: errors.lastname,
      message: errors.lastname?.message?.toString(),
      description: "Введите вашу фамилию",
    },
  ];

  return (
    <Root>
      <a href="/">
        <Image src={icon} alt="icon" />
      </a>
      {userPanel ? (
        <>
          {user.length > 0 ? (
            <>
              <Avatar handleAvatar={() => setShowCanvas(true)} />
              <Canvas
                showCanvas={showCanvas}
                handlerHide={() => setShowCanvas(false)}
                placement="end"
                exitButton={
                  <Button color="primary" onClick={closeUserPanel}>
                    Выход
                  </Button>
                }
              />
            </>
          ) : (
            <Buttons>
              <ModalWindow
                buttonVariant="link"
                handlerModalOpen={toggleEntranceModal}
                modalButtonName="Вход"
                isOpened={entranceModal}
                toggleModal={toggleEntranceModal}
                modalTitle="Вход"
                modalForm={
                  <>
                    {entranceArray.map((el: any, i) => (
                      <>
                        <Input
                          key={i}
                          id={el.placeholder}
                          value={value[i]}
                          placeholder={el.placeholder}
                          {...register(el.register, {
                            onChange: handlerInput(i),
                          })}
                        />
                        <Descriptions>
                          {el.error ? (
                            <ErrorMessage>{el.message}</ErrorMessage>
                          ) : (
                            <Description>{el.description}</Description>
                          )}
                        </Descriptions>
                      </>
                    ))}
                  </>
                }
                modalButtons={
                  <>
                    <Button
                      color="primary"
                      onClick={handleSubmit(loginToAccount)}
                    >
                      Добавить
                    </Button>
                    <Button color="secondary" onClick={toggleEntranceModal}>
                      Отмена
                    </Button>
                  </>
                }
              />
              <ModalWindow
                buttonVariant="primary"
                handlerModalOpen={toggleRegistrationModal}
                modalButtonName="Регистрация"
                isOpened={registrationModal}
                toggleModal={toggleRegistrationModal}
                modalTitle="Регистрация"
                modalForm={
                  <>
                    {registrationArray.map((el: any, i) => (
                      <>
                        <Input
                          key={i}
                          id={el.placeholder}
                          value={value[i]}
                          placeholder={el.placeholder}
                          {...register(el.register, {
                            onChange: handlerInput(i),
                          })}
                        />
                        <Descriptions>
                          {el.error ? (
                            <ErrorMessage>{el.message}</ErrorMessage>
                          ) : (
                            <Description>{el.description}</Description>
                          )}
                        </Descriptions>
                      </>
                    ))}
                  </>
                }
                modalButtons={
                  <>
                    <Button
                      color="primary"
                      onClick={handleSubmit(registrationToAccount)}
                    >
                      Добавить
                    </Button>
                    <Button color="secondary" onClick={toggleRegistrationModal}>
                      Отмена
                    </Button>
                  </>
                }
              />
            </Buttons>
          )}
        </>
      ) : (
        <Buttons>
          <ModalWindow
            buttonVariant="link"
            handlerModalOpen={toggleEntranceModal}
            modalButtonName="Вход"
            isOpened={entranceModal}
            toggleModal={toggleEntranceModal}
            modalTitle="Вход"
            modalForm={
              <>
                {entranceArray.map((el: any, i) => (
                  <>
                    <Input
                      key={i}
                      id={el.placeholder}
                      value={value[i]}
                      placeholder={el.placeholder}
                      {...register(el.register, {
                        onChange: handlerInput(i),
                      })}
                    />
                    <Descriptions>
                      {el.error ? (
                        <ErrorMessage>{el.message}</ErrorMessage>
                      ) : (
                        <Description>{el.description}</Description>
                      )}
                    </Descriptions>
                  </>
                ))}
              </>
            }
            modalButtons={
              <>
                <Button color="primary" onClick={handleSubmit(loginToAccount)}>
                  Добавить
                </Button>
                <Button color="secondary" onClick={toggleEntranceModal}>
                  Отмена
                </Button>
              </>
            }
          />
          <ModalWindow
            buttonVariant="primary"
            handlerModalOpen={toggleRegistrationModal}
            modalButtonName="Регистрация"
            isOpened={registrationModal}
            toggleModal={toggleRegistrationModal}
            modalTitle="Регистрация"
            modalForm={
              <>
                {registrationArray.map((el: any, i) => (
                  <>
                    <Input
                      key={i}
                      id={el.placeholder}
                      value={value[i]}
                      placeholder={el.placeholder}
                      {...register(el.register, {
                        onChange: handlerInput(i),
                      })}
                    />
                    <Descriptions>
                      {el.error ? (
                        <ErrorMessage>{el.message}</ErrorMessage>
                      ) : (
                        <Description>{el.description}</Description>
                      )}
                    </Descriptions>
                  </>
                ))}
              </>
            }
            modalButtons={
              <>
                <Button
                  color="primary"
                  onClick={handleSubmit(registrationToAccount)}
                >
                  Добавить
                </Button>
                <Button color="secondary" onClick={toggleRegistrationModal}>
                  Отмена
                </Button>
              </>
            }
          />
        </Buttons>
      )}
    </Root>
  );
};

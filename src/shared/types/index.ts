import { ReactElement } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { store } from "../../app/store";

export type AppDispatch = typeof store.dispatch;

export interface StateTypes {
  data: Array<Object>;
  loading: boolean;
  error: undefined | string;
  modal: boolean;
}

export interface PostTypes {
  title: string;
  image: string;
  content: string;
  link: string;
}

export interface StateDataTypes {
  root: {
    data: DataTypes[];
    loading: boolean;
    error: undefined;
    modal: boolean;
  };
}

export interface DataTypes {
  id: string;
  image: string;
  title: string;
  content: string;
  link: string;
  date: string;
  source: string;
}

export interface InputProps {
  placeholder: string;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.Ref<HTMLInputElement>;
  };
  descriptions: ReactElement
}

export interface InputTypes {
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  error: FieldError | undefined;
  message: string | undefined;
  description: string;
}

export interface ModalProps {
  handlerModalOpen: () => void;
  modalButtonName: string;
  toggleModal: () => void;
  modalTitle: string;
  handlerAdd: () => void;
  form: ReactElement;
}

import { ReactElement } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { store } from "../../app/store";
import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";

export type AppDispatch = typeof store.dispatch;

export interface StateTypes {
  post: Array<Object>;
  user: Array<Object>;
  loading: boolean;
  error: undefined | string;
}

export interface StatePostTypes {
  root: {
    post: PostTypes[];
    user: UserTypes[];
    loading: boolean;
    error: undefined;
    modal: boolean;
  };
}

export interface PostTypes {
  id?: string;
  image: string;
  title: string;
  content: string;
  link: string;
  date?: string;
  source?: string;
}

export interface UserTypes {
  id?: string;
  login: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

export interface InputProps {
  placeholder: string;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.Ref<HTMLInputElement>;
  };
  descriptions: ReactElement;
}

export interface InputTypes {
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  error: FieldError | undefined;
  message: string | undefined;
  description: string;
}

export interface ModalProps {
  buttonVariant: string;
  handlerModalOpen: () => void;
  modalButtonName: string;
  isOpened: any;
  toggleModal: () => void;
  modalTitle: string;
  modalForm: ReactElement;
  modalButtons: any;
}

export interface CanvasProps {
  showCanvas: boolean;
  handlerHide: () => void;
  placement: OffcanvasPlacement;
  exitButton: ReactElement;
}

export interface AvatarProps {
  handleAvatar?: () => void;
}

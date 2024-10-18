import { ReactElement } from "react";
import { FieldError } from "react-hook-form";
import { store } from "../../app/store";
import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";

export type AppDispatch = typeof store.dispatch;

export interface StateTypes {
  posts: Array<Object>;
  user: Object;
  loading: boolean;
  error: undefined | string;
}

export interface StatePostTypes {
  root: {
    posts: PostTypes[];
    user: UserTypes;
    loading: boolean;
    error: undefined;
    modal: boolean;
    userLogged: UserLoggedTypes;
    userPosts: any;
  };
}

export interface UserLoggedTypes {
  login: string;
  firstname: string;
  lastname: string;
}

export interface PostTypes {
  id?: string;
  image: string;
  title: string;
  content: string;
  link: string;
  date?: string;
  source?: string;
  author?: string;
}

export interface UserTypes {
  id?: string;
  login: string;
  password: string;
  firstname?: string;
  lastname?: string;
  userPosts: Array<PostTypes>
}

export interface InputTypes {
  placeholder: string;
  register: string;
  error: FieldError | undefined;
  message: string | undefined;
  description: string;
}

export interface ModalProps {
  modalButton?: ReactElement;
  isOpened: boolean;
  toggleModal: () => void;
  modalTitle?: string;
  modalForm: ReactElement;
  modalButtons?: ReactElement;
}

export interface CanvasProps {
  showCanvas: boolean;
  handlerHide: () => void;
  placement: OffcanvasPlacement;
  exitButton: ReactElement;
}

export interface AvatarProps {
  handleAvatar?: () => void;
  avatar: ReactElement
}

export interface IsErrorType {
  isError: boolean;
}

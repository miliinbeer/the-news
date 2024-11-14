import { ReactElement } from "react";
import { store } from "../../app/store";

export type AppDispatch = typeof store.dispatch;

export interface StateTypes {
  posts: Array<Object>;
  users: Object;
  loading: boolean;
  error: undefined | string;
}

export interface StatePostTypes {
  root: {
    posts: PostTypes[];
    users: UserTypes;
    user: any
    loading: boolean;
    error: undefined;
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
  likes?: Array<string> | undefined
  handleLike?: () => void
  isLiked?: ReactElement
}

export interface UserTypes {
  id?: string;
  login: string;
  password: string;
  firstname?: string;
  lastname?: string;
  userPosts: Array<PostTypes>;
}

export interface IsErrorType {
  isError: boolean;
}

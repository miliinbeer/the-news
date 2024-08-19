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
  data: {
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

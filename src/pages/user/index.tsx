import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeaderWidget } from "../../widgets/header-widget";
import { Items, Item, Avatar } from "./styles";
import { AppDispatch, StatePostTypes } from "../../shared/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, searchUsers } from "../../app/api";

export const UserPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: StatePostTypes) => state.root);

  console.log(user);
  

  return (
    <>
      <HeaderWidget />
      <Link to="/">← Назад</Link>
      <Items>
        <div>
          <Avatar />
        </div>
        <Item>
          <h1>Пидорас Хуесосович</h1>
          <p>pidorashuesos</p>
          <div>
            <p>
              Колличество постов: <strong>5</strong>
            </p>
          </div>
        </Item>
      </Items>
    </>
  );
};

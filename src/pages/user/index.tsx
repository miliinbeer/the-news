import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUsers } from "../../app/api";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { AppDispatch, PostTypes, StatePostTypes } from "../../shared/types";
import { PageContainer } from "../../shared/ui-kit/page-container";
import { ErrorPage } from "../error";
import { CardWidget } from "../../shared/ui-kit/card";
import { LoaderWidget } from "../../shared/ui-kit/loader";
import {
  Root,
  Items,
  Item,
  Avatar,
  Login,
  Info,
  Cards,
  ScrollLoader,
} from "./styles";

export const UserPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const param = useParams<{ authorLogin: string }>();

  const { loading, users, error, newPosts } = useSelector(
    (state: StatePostTypes) => state.root
  );

  const user = Object.values(users).find(
    (el) => el.login === param.authorLogin
  );

  useEffect(() => {
    dispatch(fetchUsers());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const [displayCount, setDisplayCount] = useState(6);

  // TODO Исправлен из posts на newPosts
  const hasMorePosts = displayCount < newPosts.length;

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMorePosts,
    onLoadMore: () => {
      if (hasMorePosts) {
        setTimeout(() => {
          setDisplayCount((prevCount) => prevCount + 9);
        }, 1000);
      }
    },
  });

  if (loading) return <LoaderWidget />;
  if (error) return <ErrorPage />;

  // TODO Не отображается колличество постов пользователя
  return (
    <Root>
      <PageContainer>
        <Link to="/">← Назад</Link>
        <Items>
          <Item>
            <div>
              <Avatar>
                {user?.firstname?.slice(0, 1)}
                {user?.lastname?.slice(0, 1)}
              </Avatar>
            </div>
            <Info>
              <Login>{user?.login}</Login>
              {user?.firstname} {user?.lastname}
              <p>
                Колличество постов: <strong>{user?.userPosts?.length}</strong>
              </p>
            </Info>
          </Item>
          <Cards>
            {user?.userPosts.map((el: PostTypes) => (
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
        </Items>
        <div ref={infiniteRef}>
          {hasMorePosts && <ScrollLoader>Загрузка...</ScrollLoader>}
        </div>
      </PageContainer>
    </Root>
  );
};

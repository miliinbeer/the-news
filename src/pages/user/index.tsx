import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, StatePostTypes } from "../../shared/types";
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
import { fetchUserInfo } from "../../app/api";
import { PageContainer } from "../../shared/ui-kit/page-container";

import { CardWidget } from "../../shared/ui-kit/card";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const UserPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const param = useParams<{ authorLogin: string }>();

  const { user, posts, loading } = useSelector(
    (state: StatePostTypes) => state.root
  );


  // const authorInfo = user.filter((el) => el.login === param.authorLogin);

  useEffect(() => {
    dispatch(fetchUserInfo());
    // window.scrollTo(0, 0);
  }, [dispatch]);

  const [displayCount, setDisplayCount] = useState(6);

  const hasMorePosts = displayCount < posts.length;

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

  console.log(user);

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
            {/* {user?.userPosts.map((el) => (
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
          ))} */}
          </Cards>
        </Items>
        <div ref={infiniteRef}>
          {hasMorePosts && <ScrollLoader>Загрузка...</ScrollLoader>}
        </div>
      </PageContainer>
    </Root>
  );
};

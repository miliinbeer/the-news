import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { fetchUsers } from "../../app/api";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { PostTypes, StatePostTypes } from "../../shared/types";
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
  const param = useParams<{ author: string }>();

  const { loading, user, error, posts } = useSelector(
    (state: StatePostTypes) => state.root
  );

  // const user = Object.values(users).find(
  //   (el) => el.login === param.authorLogin
  // );

  const filteredPosts = posts.filter((post) => post.author === param?.author);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  if (loading) return <LoaderWidget />;
  if (error) return <ErrorPage />;

  return (
    <Root>
      <PageContainer>
        <Link to="/">← Назад</Link>
        <Items>
          <Item>
            <div>
              <Avatar>{user?.displayName?.slice(0, 1)}</Avatar>
            </div>
            <Info>
              <Login>{user?.email?.split("@gmail.com")}</Login>
              {user?.displayName}
              <p>
                Колличество постов: <strong>{filteredPosts?.length}</strong>
              </p>
            </Info>
          </Item>
          <Cards>
            {filteredPosts.map((el: PostTypes) => (
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

import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { PostTypes, StatePostTypes } from "../../shared/types";
import { ErrorPage } from "../error";
import { HeaderWidget } from "../../widgets/header-widget";
import { PageContainer } from "../../shared/ui-kit/page-container";
import { CardWidget } from "../../shared/ui-kit/card";
import { LoaderWidget } from "../../shared/ui-kit/loader";
import { Cards, ScrollLoader, LoaderContainer } from "./styles";

export const HomePage: FC = () => {
  const { loading, error, posts } = useSelector(
    (state: StatePostTypes) => state.root
  );

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

  if (error) return <ErrorPage />;

  return (
    <>
      <PageContainer>
        <HeaderWidget />
        {posts.length > 0 ? (
          <Cards>
            {posts.slice(0, displayCount).map((el: PostTypes) => {
              return (
                <CardWidget
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  image={el.image}
                  content={el.content}
                  date={new Date().toISOString().slice(0, 10)}
                  link={el.link}
                  source={el.source}
                  author={el.author}
                />
              );
            })}
          </Cards>
        ) : (
          <LoaderContainer>
            <LoaderWidget />
          </LoaderContainer>
        )}
        <div ref={infiniteRef}>
          {hasMorePosts && <ScrollLoader>Загрузка...</ScrollLoader>}
        </div>
      </PageContainer>
    </>
  );
};

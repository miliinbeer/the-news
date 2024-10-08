import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../app/api";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { AppDispatch, PostTypes, StatePostTypes } from "../../../shared/types";
import { HeaderWidget } from "../../../widgets/header-widget";
import { CardWidget } from "../../../shared/ui/card";
import { Loader } from "../../../shared/ui/loader";
import { Cards, ScrollLoader } from "./styles";

export const Content: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { post, loading } = useSelector((state: StatePostTypes) => state.root);

  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const hasMorePosts = displayCount < post.length;

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

  if (loading) return <Loader />;

  return (
    <>
      <HeaderWidget />
      <Cards>
        {post.slice(0, displayCount).map((el: PostTypes) => {
          return (
            <CardWidget
              key={el.id}
              id={el.id}
              title={el.title}
              image={el.image}
              content={el.content}
              date={el.date}
              link={el.link}
              source={el.source}
              author={el.author}
            />
          );
        })}
      </Cards>
      <div ref={infiniteRef}>
        {hasMorePosts && <ScrollLoader>Загрузка...</ScrollLoader>}
      </div>
    </>
  );
};

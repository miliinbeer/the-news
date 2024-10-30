import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { AppDispatch, PostTypes, StatePostTypes } from "../../shared/types";
import { ErrorPage } from "../error";
import { HeaderWidget } from "../../widgets/header-widget";
import { PageContainer } from "../../shared/ui-kit/page-container";
import { CardWidget } from "../../shared/ui-kit/card";
import { LoaderWidget } from "../../shared/ui-kit/loader";
import { Cards, ScrollLoader } from "./styles";
import { onValue, ref } from "firebase/database";
import { database } from "../../app/firebase";
import { setPosts } from "../../app/api";

export const HomePage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, newPosts } = useSelector(
    (state: StatePostTypes) => state.root
  );

  const [displayCount, setDisplayCount] = useState(6);

  // TODO Старый код
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);

  // TODO Переенсен из HeaderWidget
  useEffect(() => {
    // TODO Перенести в api
    const postsRef = ref(database, "posts");

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postsArray: Array<Object> = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          postsArray.push({ id: key, ...data[key] });
        });
      }

      dispatch(setPosts(postsArray));
    });

    return () => {};
  }, [dispatch]);

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

  if (error) return <ErrorPage />;

  return (
    <>
      <PageContainer>
        <HeaderWidget />
        {newPosts.length > 0 ? (
          <Cards>
            {newPosts.slice(0, displayCount).map((el: PostTypes) => {
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
          <LoaderWidget />
        )}
        <div ref={infiniteRef}>
          {hasMorePosts && <ScrollLoader>Загрузка...</ScrollLoader>}
        </div>
      </PageContainer>
    </>
  );
};

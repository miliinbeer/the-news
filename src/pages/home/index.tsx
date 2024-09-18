import React, { useEffect, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../app/api/index";
import { AppDispatch, PostTypes, StatePostTypes } from "../../shared/types";
import { HeaderWidget } from "../../widgets/header-widget";
import { CardWidget } from "../../shared/ui/card";
import { Loader } from "../../shared/ui/loader";
import { Main, Cards, ErrorContainer, Error } from "./styles";

export const Home: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const { post, user, loading, error, hasMore } = useSelector(
    (state: StatePostTypes) => state.root
  );

  // const [infiniteRef] = useInfiniteScroll({
  //   loading,
  //   hasNextPage: hasMore,
  //   onLoadMore: () => {
  //     const nextPage = Math.ceil(post.length / 6) + 1;
  //     dispatch(fetchPosts(nextPage));
  //   },
  // });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error)
    return (
      <ErrorContainer>
        <Error>{error}</Error>
      </ErrorContainer>
    );

  return (
    <>
      <HeaderWidget />
      <Main>
        <Cards>
          {post.map((el: PostTypes) => (
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
      </Main>
    </>
  );
};

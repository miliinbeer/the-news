import React, { useEffect, useState, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPost } from "../../shared/ui/modal/schema/schema";
import { fetchPosts, requestPosts } from "../../app/api/index";
import { AppDispatch, PostTypes, StatePostTypes } from "../../shared/types";
import { HeaderWidget } from "../../widgets/header-widget";
import { CardWidget } from "../../shared/ui/card";
import { ModalWindow } from "../../shared/ui/modal";
import { Loader } from "../../shared/ui/loader";
import { Button } from "reactstrap";
import {
  Main,
  Cards,
  ErrorContainer,
  Error,
  Description,
  Descriptions,
  ErrorMessage,
  Input,
} from "./styles";

export const Home: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const { post, loading, error, hasMore } = useSelector(
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

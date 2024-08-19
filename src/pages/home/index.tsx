import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../app/api/index";
import { AppDispatch, DataTypes, StateDataTypes } from "../../shared/types";
import { HeaderWidget } from "../../widgets/header-widget";
import { CardWidget } from "../../shared/ui/card";
import { Loader } from "../../shared/ui/loader";
import { Container } from "reactstrap";
import { Cards, ErrorContainer, Error } from "./styles";

export const Home: FunctionComponent = () => {
  const { loading, data, error } = useSelector(
    (state: StateDataTypes) => state.root
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loader/>;
  if (error) return (
    <ErrorContainer>
      <Error>{error}</Error>
    </ErrorContainer>
  );

  return (
    <>
      <HeaderWidget />
      <Container className="bg-light border">
        <Cards>
          {data.map((el: DataTypes) => (
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
      </Container>
    </>
  );
};

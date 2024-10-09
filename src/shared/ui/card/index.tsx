import React, { FC, useState } from "react";
import { CardProps, StatePostTypes } from "../../../shared/types";
import {
  Card,
  Image,
  Title,
  Content,
  Source,
  Info,
  Author,
  Form,
  FormTitle,
  FormText,
} from "./styles";
import { ModalWindow } from "../modal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CardWidget: FC<CardProps> = ({
  id,
  image,
  title,
  content,
  date,
  link,
  source,
  author,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const { user } = useSelector((state: StatePostTypes) => state.root);

  const toggleModal = () => {
    setIsOpened(!isOpened);
  };

  const handleAuthorClick = () => {
    console.log(`${author}`);
  };

  return (
    <ModalWindow
      modalButton={
        <Card id={id} onClick={toggleModal}>
          <Image src={image} alt={title} />
          <Title>{title}</Title>
          <Content>
            <p>{content}</p>
          </Content>
          <Source href={link}>{source}</Source>
          <Info>
            <p>{author}</p>
            <small className="text-muted">{date}</small>
          </Info>
        </Card>
      }
      isOpened={isOpened}
      toggleModal={toggleModal}
      modalForm={
        <Form>
          <FormTitle>{title}</FormTitle>
          <Image src={image} alt={title} />
          <FormText>{content}</FormText>
          <Source href={link}>{source}</Source>
          <Info>
            <Author onClick={handleAuthorClick}>
              <Link to="user">{author}</Link>
            </Author>
            <small className="text-muted">{date}</small>
          </Info>
        </Form>
      }
    />
  );
};

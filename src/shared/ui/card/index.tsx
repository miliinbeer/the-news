import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { PostTypes } from "../../../shared/types";
import { ModalWindow } from "../modal";
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

export const CardWidget: FC<PostTypes> = ({
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

  const toggleModal = () => {
    setIsOpened(!isOpened);
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
            <Link to="user">
              <Author>{author}</Author>
            </Link>
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
            <Link to="user">
              <Author>{author}</Author>
            </Link>
            <small className="text-muted">{date}</small>
          </Info>
        </Form>
      }
    />
  );
};

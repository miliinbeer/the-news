import React, { FC, useState } from "react";
import { CardProps } from "../../../shared/types";
import {
  Card,
  Image,
  Title,
  Content,
  Source,
  Info,
  Form,
  FormTitle,
  FormText,
} from "./styles";
import { ModalWindow } from "../modal";

export const CardWidget: FC<CardProps> = ({
  id,
  image,
  title,
  content,
  date,
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
          <Source>{source}</Source>
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
          <Source>{source}</Source>
          <div>
            <p>{author}</p>
            <small className="text-muted">{date}</small>
          </div>
        </Form>
      }
    />
  );
};

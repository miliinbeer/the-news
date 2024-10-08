import React, { FC } from "react";
import { PostTypes } from "../../../shared/types";
import { Root, Image, Title, Content, Source, Info } from "./styles";

export const Card: FC<PostTypes> = ({
  id,
  image,
  title,
  content,
  link,
  date,
  source,
  author,
}) => {
  return (
    <Root id={id}>
      <a href={link}>
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
      </a>
    </Root>
  );
};

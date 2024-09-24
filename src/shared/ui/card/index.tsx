import React, { FC } from "react";
import { PostTypes } from "../../../shared/types";
import { Card, CardBody, CardText } from "reactstrap";
import { CardLink, CardTitle, CardImage, CardInfo } from "./styles";

export const CardWidget: FC<PostTypes> = ({
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
    <Card id={id}>
      <CardLink href={link}>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardImage src={image} />
          <CardText
            style={{
              marginTop: "1rem",
              height: "70px",
              overflow: "hidden",
            }}
          >
            {content}
          </CardText>
          <CardText
            style={{
              height: "25px",
              overflow: "hidden",
            }}
          >
            <strong>{source}</strong>
          </CardText>
          <CardInfo>
            <div>{author}</div>
            <small className="text-muted">{date}</small>
          </CardInfo>
        </CardBody>
      </CardLink>
    </Card>
  );
};

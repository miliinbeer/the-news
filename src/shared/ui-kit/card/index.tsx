import React, { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody } from 'reactstrap'

import { PostTypes } from '../../types'
import { Card, Image, Title, Content, Source, Author, ModalTitle, ModalText } from './styles'

export const CardWidget: FC<PostTypes> = ({
  id,
  isLiked,
  image,
  title,
  content,
  link,
  author,
  date
}) => {
  const [isOpened, setIsOpened] = useState(false)

  const toggleModal = useCallback(() => {
    setIsOpened(!isOpened)
  }, [setIsOpened])

  return (
    <>
      <Card id={id}>
        {isLiked}
        <Image src={image} alt={title} />
        <Title>{title}</Title>
        <Content onClick={toggleModal}>{content}</Content>
        <Source onClick={toggleModal}>
          Источник:{' '}
          <a href={`http://${link}`} target="_blank">
            {link}
          </a>
        </Source>
        <Author>
          Автор: <Link to={`user/${author}`}>{author}</Link>
        </Author>
        <small className="text-muted">{date}</small>
      </Card>
      <Modal isOpen={isOpened} toggle={toggleModal}>
        <ModalBody>
          <ModalTitle>{title}</ModalTitle>
          <Image src={image} alt={title} />
          <ModalText>{content}</ModalText>
          <Source>
            Источник:{' '}
            <a href={`http://${link}`} target="_blank">
              {link}
            </a>
          </Source>
          <Author>
            Автор: <Link to={`user/${author}`}>{author}</Link>
          </Author>
          <small className="text-muted">{date}</small>
        </ModalBody>
      </Modal>
    </>
  )
}

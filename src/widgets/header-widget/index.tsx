import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithPopup, signOut } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import React, { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

import { setUser } from '../../app/api'
import { database } from '../../app/firebase'
import { auth, provider } from '../../app/firebase'
import logotype from '../../shared/icons/logotype.webp'
import { AppDispatch, StatePostTypes } from '../../shared/types'
import { CanvasWidget } from '../../shared/ui-kit/canvas'
import { PageContainer } from '../../shared/ui-kit/page-container'
import { schemaPost } from './schema'
import {
  Root,
  Items,
  Logotype,
  Icon,
  UserPanel,
  Label,
  Input,
  Textarea,
  Description,
  Avatar
} from './styles'

export const HeaderWidget: FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const { user } = useSelector((state: StatePostTypes) => state.root)

  const [showCanvas, setShowCanvas] = useState(false)
  const [postModal, setPostModal] = useState(false)

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<yup.InferType<typeof schemaPost>>({
    resolver: yupResolver(schemaPost)
  })

  const addPost: SubmitHandler<yup.InferType<typeof schemaPost>> = async (el) => {
    const login = user?.email?.split('@gmail.com')[0].split('@umbrellait.com')[0]

    const fullPostData = {
      ...el,
      likes: [],
      author: login,
      date: new Date().toISOString().slice(0, 10)
    }

    const postsRef = ref(database, 'posts/' + uuidv4())
    try {
      await set(postsRef, fullPostData)
    } catch (error) {
      console.error('Возникла ошибка:', error)
    }
    setPostModal(!postModal)
  }

  const toggleModal = () => {
    setPostModal(!postModal)
    reset()
  }

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null))
      })
      .catch((error) => {
        console.error('Возникла ошибка:', error)
      })
  }

  return (
    <Root>
      <PageContainer>
        <Items>
          <Logotype href="/">
            <Icon src={logotype} alt="logogtype" />
            <p>
              / THE <span>NEWS</span>
            </p>
          </Logotype>
          {user ? (
            <UserPanel>
              <Button
                data-toplint="someValue"
                color="primary"
                outline
                data-tooltip="Добавить новость"
                onClick={toggleModal}
              >
                +
              </Button>
              <Modal isOpen={postModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Добавить новую новость</ModalHeader>
                <ModalBody>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => {
                      const isError = !!errors.title
                      return (
                        <Label htmlFor="title">
                          <p>
                            Заголовок <span>*</span>
                          </p>
                          <Input {...field} isError={isError} name="title" />
                          <Description>{isError ? errors?.title?.message : null}</Description>
                        </Label>
                      )
                    }}
                  />
                  <Controller
                    control={control}
                    name="image"
                    render={({ field }) => {
                      const isError = !!errors.image
                      return (
                        <Label htmlFor="image">
                          <p>
                            Изображение <span>*</span>
                          </p>
                          <Input {...field} isError={isError} name="image" />
                          <Description>{isError ? errors?.image?.message : null}</Description>
                        </Label>
                      )
                    }}
                  />
                  <Controller
                    control={control}
                    name="content"
                    render={({ field }) => {
                      const isError = !!errors.content
                      return (
                        <Label htmlFor="content">
                          <p>
                            Контент <span>*</span>
                          </p>
                          <Textarea {...field} isError={isError} rows={2} name="content" />
                          <Description>{isError ? errors?.content?.message : null}</Description>
                        </Label>
                      )
                    }}
                  />
                  <Controller
                    control={control}
                    name="link"
                    render={({ field }) => {
                      const isError = !!errors.link
                      return (
                        <Label htmlFor="link">
                          <p>
                            Ссылка на источник <span>*</span>
                          </p>
                          <Input {...field} isError={isError} name="link" />
                          <Description>{isError ? errors?.link?.message : null}</Description>
                        </Label>
                      )
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleSubmit(addPost)}>
                    Добавить
                  </Button>
                  <Button color="secondary" onClick={toggleModal}>
                    Отмена
                  </Button>
                </ModalFooter>
              </Modal>
              <Avatar onClick={() => setShowCanvas(true)}>{user?.displayName?.slice(0, 1)}</Avatar>
              <CanvasWidget
                showCanvas={showCanvas}
                handlerHide={() => setShowCanvas(false)}
                placement="end"
                exitButton={
                  <Button color="primary" onClick={handleSignOut}>
                    Выход
                  </Button>
                }
              />
            </UserPanel>
          ) : (
            <Button color="primary" onClick={handleSignIn}>
              Вход
            </Button>
          )}
        </Items>
      </PageContainer>
    </Root>
  )
}

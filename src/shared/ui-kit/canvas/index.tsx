import React, { FC, ReactElement } from 'react'
import Offcanvas, { OffcanvasPlacement } from 'react-bootstrap/Offcanvas'

import { auth } from '../../../app/firebase'
import { Items, Buttons, Avatar } from './styles'

interface Props {
  showCanvas: boolean
  handlerHide: () => void
  placement: OffcanvasPlacement
  exitButton: ReactElement
}

export const CanvasWidget: FC<Props> = ({ showCanvas, handlerHide, placement, exitButton }) => {
  const userInfo = auth.currentUser

  return (
    <Offcanvas show={showCanvas} onHide={handlerHide} placement={placement}>
      <Offcanvas.Header closeButton>
        <Avatar>{userInfo?.displayName?.slice(0, 1)}</Avatar>
        <Items>
          <strong>{userInfo?.email?.split('@gmail.com')[0]?.split('@umbrellait.com')[0]}</strong>
          <div>{userInfo?.displayName}</div>
        </Items>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illum fugit omnis non totam
          voluptate odit nemo animi corrupti est, nobis quos eligendi pariatur dolore velit quaerat
          voluptates, sapiente error?
        </p>
        <Buttons>{exitButton}</Buttons>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

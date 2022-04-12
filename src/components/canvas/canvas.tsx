import React from 'react'
import type { FC } from 'react';
import './canvas.css';

type CanvasProps = {
  columns: JSX.Element[]
}

export const Canvas: FC<CanvasProps> = ({columns}) => {
  return (
    <svg className={"canvas"}>
      {columns}
    </svg>
  )
}

export default Canvas
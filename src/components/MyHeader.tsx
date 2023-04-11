import React from "react"

interface MyHeaderProps {
  headText: string
  leftChild: JSX.Element
  rightChild: JSX.Element | null
}

const MyHeader = ({headText, leftChild, rightChild}: MyHeaderProps) => {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  )
}

export default MyHeader

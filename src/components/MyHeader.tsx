import React from "react"

interface MyHeaderProps {
  headText: string
  leftChild: JSX.Element
  rightChild: JSX.Element | null
}

const MyHeader = ({headText, leftChild, rightChild}: MyHeaderProps) => {
  return (
    <header className="flex items-center border-b border-solid border-[#e2e2e2] py-5 px-0 [&>div]:flex">
      <div className="justify-start w-1/4">{leftChild}</div>
      <div className="justify-center w-2/4 text-2xl">{headText}</div>
      <div className="justify-end w-1/4">{rightChild}</div>
    </header>
  )
}

export default MyHeader

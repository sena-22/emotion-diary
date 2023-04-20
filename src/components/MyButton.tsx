import React from "react"

interface MyButtonProps {
  type?: "positive" | "negative" | "default"
  text: string
  onClick: () => void
}

const MyButton = ({type = "default", text, onClick}: MyButtonProps) => {
  //이상한 타입이면 강제로 디폴트 타입으로 변경
  const btnType = ["positive", "negative"].includes(type) ? type : "default"

  return (
    <button
      className={`py-2 px-4 border-none rounded cursor-pointer ${
        btnType === "positive"
          ? "bg-[#64c964] text-white"
          : btnType === "negative"
          ? "bg-[#fd565f] text-white"
          : "bg-[#ececec] text-black"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

MyButton.defaultProps = {
  type: "default",
}

export default MyButton

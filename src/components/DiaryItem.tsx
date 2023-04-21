import React from "react"
import {useNavigate} from "react-router-dom"

import MyButton from "./MyButton"

import {DiaryItem as DiaryItemProps} from "../types"

type EmotionType = {
  [key: number]: string
}

const Emotion: EmotionType = {
  1: "bg-[#64c964]",
  2: "bg-[#9dd772]",
  3: "bg-[#fdce17]",
  4: "bg-[#fd8446]",
  5: "bg-[#fd565f]",
}

const DiaryItem = (props: DiaryItemProps) => {
  const {id, date, emotion, content} = props
  const navigate = useNavigate()

  const env = process.env
  env.PUBLIC_URL = env.PUBLIC_URL || ""

  // ms로 들어온 날짜를 연월일 형식으로 바꿔줌
  const strDate = new Date(date).toLocaleDateString()

  const goDetail = () => {
    navigate(`/diary/${id}`)
  }

  const goEdit = () => {
    navigate(`/edit/${id}`)
  }

  return (
    <div className="py-3.5 border-b-[1px] border-[#e2e2e2] flex justify-between">
      {/* 1.이미지
       2. 다이어리 데이터
       3. 수정 버튼  */}
      <div
        onClick={goDetail}
        className={[
          "cursor-pointer, min-w-[120px] h-20 rounded flex justify-center",
          Emotion[emotion],
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `/emotion/emotion${emotion}.png`}
          alt="emotion"
          className="w-[70%]"
        />
      </div>
      <div onClick={goDetail} className="ml-5 cursor-pointer grow">
        <div className="mb-1 text-2xl font-bold">{strDate}</div>
        <div className="text-lg">{content.slice(0, 25)}</div>
      </div>
      <div className="min-[70px]">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  )
}

export default React.memo(DiaryItem)

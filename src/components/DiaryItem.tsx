import React from "react"
import {useNavigate} from "react-router-dom"

import MyButton from "./MyButton"

import {DiaryItem as DiaryItemProps} from "../types"

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
    <div className="DiaryItem">
      {/* 1.이미지
       2. 다이어리 데이터
       3. 수정 버튼  */}
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `/emotion/emotion${emotion}.png`}
          alt="emotion"
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  )
}

export default React.memo(DiaryItem)

import React from "react"
import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

import {MyHeader, MyButton} from "../components"

import {getStringDate} from "../util/date"
import {emotionList} from "../util/emotion"

import {DiaryItem} from "../types"
import useDiaryStore from "../zustand/store"

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

const Diary = () => {
  const {id} = useParams()
  const {data: diaryList} = useDiaryStore((state) => state)
  const navigate = useNavigate()
  const [data, setData] = useState<DiaryItem | null>()

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`
  }, [id])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary: DiaryItem | undefined = diaryList.find(
        (it: DiaryItem) => it.id === parseInt(id ?? "0")
      )

      if (targetDiary) {
        setData(targetDiary)
      } else {
        alert("없는 일기입니다.")
        navigate("/", {replace: true})
      }
    }
  }, [id, diaryList, navigate])

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>
  } else {
    const currentEmotionData = emotionList.find(
      (it) => it.emotion_id === data.emotion
    )
    return (
      <div>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section className="w-full mb-[100px] flex flex-col items-center text-center">
            <h4 className="text-[22px] font-bold m-5">오늘의 감정</h4>
            <div
              className={[
                " w-64 h-64 rounded flex flex-col items-center justify-around text-white",
                Emotion[data.emotion],
              ].join(" ")}
            >
              <img src={currentEmotionData?.emotion_img} alt="emotion" />
              <div className="text-2xl text-white">
                {currentEmotionData?.emotion_descript}
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center w-full mb-10 text-center">
            <h4 className="text-[22px] font-bold m-5">오늘의 일기</h4>
            <div className="w-full bg-[#ececec] rounded break-keep break-words">
              <p className="p-5 text-xl font-normal text-left leading-[2.5]">
                {data.content}
              </p>
            </div>
          </section>
        </article>
      </div>
    )
  }
}
export default Diary

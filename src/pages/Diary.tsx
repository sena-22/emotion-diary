import React from "react"
import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

import {MyHeader, MyButton} from "../components"

import {getStringDate} from "../util/date"
import {emotionList} from "../util/emotion"

import {DiaryItem} from "../types"
import useDiaryStore from "../zustand/store"

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
      <div className="DiaryPage">
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
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={currentEmotionData?.emotion_img} alt="emotion" />
              <div className="emotion_descript">
                {currentEmotionData?.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  }
}
export default Diary

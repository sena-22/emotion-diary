import {useNavigate} from "react-router-dom"
import {useState, useRef, useContext, useEffect, useCallback} from "react"
import {DiaryDispatchContext} from "../App"

import MyHeader from "./MyHeader"
import MyButton from "./MyButton"
import EmotionItem from "./EmotionItem"

import {getStringDate} from "../util/date.js"
import {emotionList} from "../util/emotion.js"
import React from "react"

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ""

/* 새 일기 작성, 일기 수정 페이지에서 같이 쓸 컴포넌트 */
const DiaryEditor = ({isEdit, originData}) => {
  const contentRef = useRef()
  const [content, setContent] = useState("")
  // 어떤 감정을 선택했는지 저장하는 state
  const [emotion, setEmotion] = useState(3)
  const [date, setDate] = useState(getStringDate(new Date()))

  const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext)

  //감정을 선택하면 상태를 바꿔주는 함수
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion)
  }, [])

  const navigate = useNavigate()

  const handleSubmit = () => {
    if (contentRef.length < 1) {
      contentRef.current.focus()
      return
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        //수정 중이지 않을 때
        const newDiaryItem = {
          date: date,
          content: content,
          emotion: emotion,
        }
        onCreate(newDiaryItem)
      } else {
        onEdit(originData.id, date, content, emotion)
      }
    }
    navigate("/", {replace: true}) //뒤로 가기 못 오게 만듬
  }

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id)
      navigate("/", {replace: true})
    }
  }
  const goBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))))
      setEmotion(originData.emotion)
      setContent(originData.content)
    }
  }, [isEdit, originData])
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton onClick={goBack} text={"< 뒤로가기"} />}
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <div>
          <section>
            <h4>오늘은 언제인가요?</h4>
            <div className="input_box">
              <input
                className="input_date"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </div>
          </section>
          <section>
            <h4>오늘의 감정</h4>
            <div className="input_box emotion_list_wrapper">
              {emotionList.map((it) => (
                <EmotionItem
                  key={it.emotion_id}
                  {...it}
                  onClick={handleClickEmote}
                  //선택된 emotion만 true로 받음
                  isSelected={it.emotion_id === emotion}
                />
              ))}
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="input_box text_wrapper">
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </section>
          <section>
            <div className="control_box">
              <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
              <MyButton
                text={"작성완료"}
                type={"positive"}
                onClick={handleSubmit}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DiaryEditor

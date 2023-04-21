import React, {useState, useRef, useEffect, useCallback} from "react"
import {useNavigate} from "react-router-dom"

import {MyHeader, MyButton, EmotionItem} from "./index"

import {getStringDate} from "../util/date"
import {emotionList} from "../util/emotion"

import {DiaryItem} from "../types"

import useDiaryStore from "../zustand/store"

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ""

type DiaryEditorProps = {
  isEdit: boolean
  originData: DiaryItem | undefined
}

/* 새 일기 작성, 일기 수정 페이지에서 같이 쓸 컴포넌트 */
const DiaryEditor = ({isEdit, originData}: DiaryEditorProps) => {
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [content, setContent] = useState("")
  // 어떤 감정을 선택했는지 저장하는 state
  const [emotion, setEmotion] = useState<number>(3)
  const [date, setDate] = useState(getStringDate(new Date()))

  const {onCreate, onEdit, onRemove} = useDiaryStore((state) => state)

  //감정을 선택하면 상태를 바꿔주는 함수
  const handleClickEmote = useCallback((emotion: number) => {
    setEmotion(emotion)
  }, [])

  const navigate = useNavigate()

  const handleSubmit = () => {
    if (contentRef.current && contentRef.current.value.length < 1) {
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
        const newDiaryItem: DiaryItem = {
          date: date,
          content: content,
          emotion: emotion,
          id: 0,
        }
        onCreate(newDiaryItem)
      } else {
        if (originData) {
          const editItem = {
            id: originData.id,
            date,
            content,
            emotion,
          }
          onEdit(editItem)
        }
      }
    }
    navigate("/", {replace: true}) //뒤로 가기 못 오게 만듬
  }

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData?.id ?? 0)
      navigate("/", {replace: true})
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (isEdit && originData) {
      setDate(getStringDate(new Date(originData.date)))
      setEmotion(originData.emotion)
      setContent(originData.content)
    }
  }, [isEdit, originData])

  return (
    <div className="mb-10">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton onClick={goBack} text={"< 뒤로가기"} />}
        rightChild={
          isEdit ? (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          ) : (
            <></>
          )
        }
      />
      <div>
        <div>
          <section className="mb-10">
            <h4 className="text-[22px] font-bold mb-10 mt-10">
              오늘은 언제인가요?
            </h4>
            <div className="input_box">
              <input
                className="border-none rounded bg-[#ececec] py-2.5 px-5 cursor-pointer text-xl"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </div>
          </section>
          <section className="mb-10">
            <h4 className="text-[22px] font-bold mb-10">오늘의 감정</h4>
            <div className="grid grid-cols-5 input_box gap-[2%]">
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
          <section className="mb-10">
            <h4 className="text-[22px] font-bold mb-10">오늘의 일기</h4>
            <div className="input_box text_wrapper">
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="text-xl box-border w-full min-h-[200px] resize-y border-none rounded bg-[#ececec] p-5"
              />
            </div>
          </section>
          <section className="mb-10">
            <div className="flex items-center justify-between">
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

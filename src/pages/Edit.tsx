import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"

import DiaryEditor from "../components/DiaryEditor"
import {DiaryItem} from "../types"

import React from "react"
import useDiaryStore from "../zustand/store"

const Edit = () => {
  const [originData, setOriginData] = useState<DiaryItem>()
  const {id} = useParams()

  const navigate = useNavigate()
  const {data: diaryList} = useDiaryStore((state) => state)

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`
  }, [id])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => it.id === parseInt(id ?? "0"))

      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        navigate("/", {replace: true})
      }
    }
  }, [id, diaryList, navigate])
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}

export default Edit

import {useContext, useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {DiaryStateContext} from "../App"
import DiaryEditor from "../components/DiaryEditor"
import {DiaryItem} from "../types"
import React from "react"

const Edit = () => {
  const [originData, setOriginData] = useState<DiaryItem>()
  const {id} = useParams()

  const navigate = useNavigate()
  const diaryList = useContext(DiaryStateContext)

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`
  }, [id])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => it.dataId === parseInt(id ?? "0")
      )

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

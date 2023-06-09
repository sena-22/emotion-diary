import React, {useEffect, useState} from "react"

import {MyHeader, MyButton, DiaryList} from "../components"

import {DiaryItem} from "../types"
import useDiaryStore from "../zustand/store"
import MetaHeader from "../components/MetaHeader"

const Home = () => {
  const {data: diaryList} = useDiaryStore((state) => state)
  const [data, setData] = useState<DiaryItem[]>([])
  const [curDate, setCurDate] = useState(new Date())

  //getMonth의 경우 1월이 0으로나와서 +1을 해주어야 한다.
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  useEffect(() => {
    if (diaryList.length >= 1) {
      //이번 연도 이번 월의 1일
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime()

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime()
      //해당 월만 필터링

      setData(
        diaryList.filter(
          (it: DiaryItem) => firstDay <= it.date && it.date <= lastDay
        )
      )
    }
  }, [diaryList, curDate])

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장`
  }, [])

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    )
  }

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    )
  }

  return (
    <div>
      <MetaHeader />
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home

import {useContext, useEffect, useState} from "react"

import MyHeader from "../components/MyHeader"
import MyButton from "../components/MyButton"
import {DiaryStateContext} from "../App"
import DiaryList from "../components/DiaryList"

const Home = () => {
  const diaryList = useContext(DiaryStateContext)

  const [data, setData] = useState([])

  const [curDate, setCurDate] = useState(new Date())

  //getMonth의 경우 1월이 0으로나와서 +1을 해주어야 한다.
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장`
  }, [])

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
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      )
    }
  }, [diaryList, curDate])

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

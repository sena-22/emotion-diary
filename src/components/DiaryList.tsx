import React, {useState} from "react"
import MyButton from "./MyButton"
import {useNavigate} from "react-router-dom"
import DiaryItem from "./DiaryItem"
import {DiaryItem as DiaryItemProps, TodoState} from "../types"

interface DiaryListType {
  diaryList: TodoState
}

type Option = {
  value: string
  name: string
}

interface ControlMenuProps {
  value: string
  onChange: (value: string) => void
  optionList: Option[]
}

const sortOptionList = [
  {value: "latest", name: "최신 순"},
  {value: "oldest", name: "오래된 순"},
]

const filterOptionList = [
  {value: "all", name: "전부 다"},
  {value: "good", name: "좋은 감정만"},
  {value: "bad", name: "안 좋은 감정만"},
]

const ControlMenu = React.memo(
  ({value, onChange, optionList}: ControlMenuProps) => {
    return (
      <select
        className="ControlMenu"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {optionList.map((it, idx) => (
          <option key={idx} value={it.value}>
            {it.name}
          </option>
        ))}
      </select>
    )
  }
)

const DiaryList = ({diaryList}: DiaryListType) => {
  const navigate = useNavigate()

  const [sortType, setSortType] = useState("latest")
  //감정 상태 필터링
  const [filter, setFilter] = useState("all")

  const getProcessedDiaryList = () => {
    //필터링용 함수
    const filterCallback = (item: DiaryItemProps) => {
      if (filter === "good") {
        return item.emotion <= 3
      } else {
        return item.emotion > 3
      }
    }

    //최신 순이면 date가 빠른 순, 오래된 순이면 date가 느린 순
    //diaryList를 깊은 복사하기 위해 JSON.parse(JSON.stringify()사용

    //객체 배열을 정렬하기 위해서는 비교 함수를 만들어줘야 함
    const compare = (a: DiaryItemProps, b: DiaryItemProps) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date)
      } else {
        return parseInt(a.date) - parseInt(b.date)
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList))

    console.log(diaryList)

    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it: DiaryItemProps) => filterCallback(it))

    const sortedList = filteredList.sort(compare)
    return sortedList
  }

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it: DiaryItemProps) => (
        <DiaryItem key={it.dataId} {...it} />
      ))}
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList

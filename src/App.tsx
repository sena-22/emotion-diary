import React, {useEffect, useReducer, useRef, createContext} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import "./App.css"
import {Diary, Edit, Home, New} from "./pages/index"

import {DiaryItem} from "./types"
import {TodoState} from "./types"

type Action =
  | {type: "INIT"; data: DiaryItem[]}
  | {type: "CREATE"; data: DiaryItem}
  | {type: "REMOVE"; targetId: number}
  | {type: "EDIT"; data: DiaryItem}

type TodoDispatch = {
  onCreate: (data: DiaryItem) => void
  onRemove: (targetId: number) => void
  onEdit: (item: DiaryItem) => void
}

const reducer: React.Reducer<DiaryItem[], Action> = (state, action) => {
  let newState: DiaryItem[] = []
  switch (action.type) {
    case "INIT": {
      return action.data
    }
    case "CREATE": {
      newState = [action.data, ...state]
      break
    }
    case "REMOVE": {
      newState = state.filter((it) => it.dataId !== action.targetId)
      break
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.dataId === action.data.dataId ? {...action.data} : it
      )
      break
    }
    default:
      return state
  }
  localStorage.setItem("diary", JSON.stringify(newState)) //서버에  요청
  return newState
}

export const DiaryStateContext = createContext<TodoState>([])
export const DiaryDispatchContext = createContext<TodoDispatch>({
  onCreate: () => {},
  onRemove: () => {},
  onEdit: () => {},
})

function App() {
  const env = process.env
  env.PUBLIC_URL = env.PUBLIC_URL || ""

  const [data, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const localData = localStorage.getItem("diary") // 서버

    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a: {id: number}, b: {id: number}) => b.id - a.id
      )

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1
        dispatch({type: "INIT", data: diaryList})
      }
    }
  }, [])

  const dataId = useRef(0)

  //CREATE
  const onCreate = ({date:, content, emotion}) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
    dataId.current++
  }

  //REMOVE
  const onRemove = (targetId: number) => {
    dispatch({type: "REMOVE", targetId})
  }

  //EDIT
  const onEdit = (DiaryItem: DiaryItem) => {
    dispatch({
      type: "EDIT",
      data: DiaryItem,
    })
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
          <BrowserRouter>
            <div className="App">
              {/* process.env.PUBLIC_URL :현 위치와 상관없이 public 디렉터리를  가리킴 */}
              {/* <img src={process.env.PUBLIC_URL + "/emotion/emotion1.png"} /> */}

              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/new" element={<New />}></Route>
                <Route path="/edit/:id" element={<Edit />}></Route>
                <Route path="/diary/:id" element={<Diary />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App

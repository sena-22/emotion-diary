import {create} from "zustand"
import {DiaryItem} from "../types"

type DiaryStore = {
  data: DiaryItem[]
  dataId?: number
  onCreate: (data: DiaryItem) => void
  onRemove: (targetId: number) => void
  onEdit: (item: DiaryItem) => void
}

const getInitialState = () => {
  const localData = localStorage.getItem("diary")
  if (!localData) return []
  const {data, dataId} = JSON.parse(localData)
  const diaryList = data.sort((a: {id: number}, b: {id: number}) => b.id - a.id)
  return diaryList
}

const initialState = getInitialState()

const useDiaryStore = create<DiaryStore>((set, get) => ({
  data: initialState,
  onCreate: ({date, content, emotion}: DiaryItem) =>
    set((state: any) => {
      const maxId = state.data.reduce((prev: number, curr: DiaryItem) => {
        return prev > curr.id ? prev : curr.id
      }, 0)
      const newDiaryItem: DiaryItem = {
        id: maxId + 1,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
      const newState = {
        data: [newDiaryItem, ...state.data],
        dataId: maxId + 1,
      }
      localStorage.setItem("diary", JSON.stringify(newState))
      return newState
    }),

  onRemove: (targetId: number) => {
    set((state: any) => ({
      ...state,
      data: state.data.filter((it: DiaryItem) => it.id !== targetId),
    }))
    localStorage.setItem("diary", JSON.stringify(get()))
  },
  onEdit: ({id, date, content, emotion}: DiaryItem) => {
    set((state: any) => ({
      ...state,
      data: state.data.map((it: DiaryItem) =>
        it.id === id
          ? {
              id,
              date: new Date(date).getTime(),
              content,
              emotion,
            }
          : it
      ),
    }))
    localStorage.setItem("diary", JSON.stringify(get()))
  },
}))

export default useDiaryStore

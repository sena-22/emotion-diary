export interface DiaryItem {
  dataId?: number
  date: string
  content: string
  emotion: number
  text?: string
}

export type TodoState = DiaryItem[]

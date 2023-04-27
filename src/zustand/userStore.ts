import {create} from "zustand"

type User = {
  uid: string
  email: string | null
  photo: string | null
  displayName: string | null
}

type LoginStore = {
  user: User | null
  login: (user: User) => void // 로그인 함수
  logout: () => void // 로그아웃 함수
}

const initialState = {
  user: null,
}

const useLoginStore = create<LoginStore>((set) => ({
  user: initialState.user,
  login: (userData) =>
    set((state: LoginStore) => ({
      ...state,
      user: {
        uid: userData.uid,
        photo: userData.photo,
        email: userData.email,
        displayName: userData.displayName,
      },
    })),
  logout: () => set((state) => ({...state, user: null})),
}))
export default useLoginStore

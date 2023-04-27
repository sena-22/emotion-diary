import React from "react"
import {useNavigate} from "react-router-dom"
import {auth} from "../firebase"

const MetaHeader = () => {
  const navigate = useNavigate()

  const signOut = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      auth.signOut()
      navigate("/login")
    }
  }

  const ImgList = [1, 2, 3, 4, 5]

  return (
    <header className="flex items-center  py-2 px-0 [&>div]:flex justify-between">
      <div className="w-full">
        {ImgList.map((img, idx) => (
          <img
            key={idx}
            src={process.env.PUBLIC_URL + `/emotion/emotion${img}.png`}
            alt="logo"
            className="w-5 mr-1 sm:w-8"
          />
        ))}
      </div>
      <button
        data-theme="wireframe"
        className="text-xs sm:text-sm md:text-md lg:text-lg btn btn-xs sm:btn-sm md:btn-md lg:btn-md "
        onClick={signOut}
      >
        Logout
      </button>
    </header>
  )
}

export default MetaHeader

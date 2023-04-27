import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {signInWithPopup} from "firebase/auth"
import {auth, provider} from "../firebase"
import useLoginStore from "../zustand/userStore"

const Login = () => {
  const navigate = useNavigate()
  const {user} = useLoginStore()

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/")
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  useEffect(() => {
    user && navigate("/")
    navigate("/")
  }, [])

  return (
    <div className="grid align-middle place-items-center">
      <div className="loginLogo ">
        <img
          src={process.env.PUBLIC_URL + "/thumbnail.png"}
          alt="emotion logo"
          className="mt-[200px]"
        />
      </div>
      <button
        data-theme="wireframe"
        className="text-xs sm:text-sm md:text-md lg:text-lg btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-[-50px]"
        onClick={signIn}
      >
        Login
      </button>
    </div>
  )
}

export default Login

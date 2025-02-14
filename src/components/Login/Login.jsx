import React, {useContext, useEffect, useState} from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
export default function Login() {
  let [errorMsg, setErrorMsg] = useState(null)
  let [successMsg, setSuccessMsg] = useState(null)
  let [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setToken} = useContext(AuthContext)
  useEffect(()=>{
    document.title = 'Login'
  },[])
  const validationSchema = yup.object().shape({
    email: yup.string().required("email is required").email("enter valid email"),
    password: yup.string().required("password is required").matches(/^[A-z0-9_]{8,30}$/, "password between 8 to 30 chars"),
  })
  async function login(values) {
    setErrorMsg(null)
    setSuccessMsg(null)
    setLoading(true)
    try{
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      setSuccessMsg(res.data.message)
      setToken(res.data.token)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    }catch(err){
      setErrorMsg(err.response.data.message)
    }finally{
      setLoading(false)
    }
  }
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
  });
  return (
    <>
      <form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto py-6 px-8 mt-2 min-h-[50vh]">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {Formik.errors.email && Formik.touched.email ? <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span> enter valid email
        </div>:null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            type="password"
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {Formik.errors.password && Formik.touched.password ? <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span> password should between 8 and 30 chars
        </div>:null}
        <div>
          <Link to={'/forgotpassword'} className="text-red-700 underline">Forget password?</Link>
        </div>
        <button
          type="submit"
          className="cursor-pointer text-white block ml-auto  bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "loading...": "submit"}
        </button>
      </form>
      {errorMsg ? <div className="text-red-600 text-center text-2xl">{errorMsg}</div>:null}
      {successMsg ? <div className="text-emerald-600 text-center text-2xl">{successMsg}</div>:null}
    </>
  );
}

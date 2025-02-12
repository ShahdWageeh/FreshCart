import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  useEffect(()=>{
    document.title = 'Forget Password'
  },[])
  async function handleSubmit(values){
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email: values.email });
      if (res.data.statusMsg === "success") {
        navigate('/resetcode')
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.", err);
    }
  }
  const formik = useFormik({
    initialValues:{
      email:""
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit:handleSubmit
  })
  return (
    <>
    <div className='container min-h-[50vh] py-10'>
      <h1 className='text-center text-3xl font-bold'>Forget Password</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-6">
        <div>
          <div className='flex flex-col'>
            <label className='text-[#0AAD0A] text-xl'>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          </div>
          
          {formik.touched.email && formik.errors.email ? (
            <div className='text-red-600'>{formik.errors.email}</div>
          ) : null}
        </div>
        {error && <div className='text-red-600'>Incorrect email</div>}
        <button className="cursor-pointer text-white block ml-auto mt-5 bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">Send Reset Code</button>
      </form>
    </div>
    </>
  )
}

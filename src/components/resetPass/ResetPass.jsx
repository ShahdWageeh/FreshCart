import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
export default function ResetPass() {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    useEffect(()=>{
      document.title = 'Reset Password'
    },[])

    async function handleSubmit(values) {
        try {
            const res = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
              email: values.email,
              newPassword: values.newPassword,
            });
            if (res.data.token) {
              localStorage.setItem('token', res.data.token);
              navigate('/')
            } else {
              setError(res.data.message);
            }
          } catch (err) {
            setError("An error occurred. Please try again.");
          }
        
    }
    const formik = useFormik({
        initialValues:{
            email: "",
            newPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            newPassword: Yup.string().required("Required").matches(/^[A-z0-9_]{8,30}$/, "password between 8 to 30 chars"),
          }),
        onSubmit:handleSubmit
    })
  return (
    <div className='container  py-10'>
    <h1 className='text-center text-3xl font-bold'>Reset Password</h1>
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
      <div>
        <div className='flex flex-col mt-3'>
            <label className='text-[#0AAD0A] text-xl'>New Password</label>
        <input
          type="password"
          name="newPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
        />
        </div>
        
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className='text-red-600'>{formik.errors.newPassword}</div>
        ) : null}
      </div>
      {error && <div className='text-red-600'>{error}</div>}
      <button className="cursor-pointer text-white block ml-auto mt-5 bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">Reset Password</button>
    </form>
  </div>
  )
}



import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    useEffect(()=>{
      document.title = 'Verify Code'
    },[])

    async function handleSubmit(values){
        try {
            const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode: values.resetCode });
            if (res.data.status === "Success") {
              navigate('/resetpassword')
            } else {
              setError("Reset code is invalid or has expired");
            }
          } catch (err) {
            setError("An error occurred. Please try again.");
          }
    }

    const formik = useFormik({
        initialValues:{
            resetCode:''
        },
        validationSchema: Yup.object({
            resetCode: Yup.string().required("Required"),
        }),
        onSubmit:handleSubmit
    })
  return (
    <div className='container min-h-[50vh] py-10 px-8'>
    <h1 className='text-center text-3xl font-bold'>Verify Reset Code</h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-6">
      <div>
        <div className='flex flex-col'>
        <label className='text-[#0AAD0A] text-xl'>Reset Code</label>
        <input
          type="text"
          name="resetCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.resetCode}
        />
        </div>
        {formik.touched.resetCode && formik.errors.resetCode ? (
          <div className='text-red-600'>{formik.errors.resetCode}</div>
        ) : null}
      </div>
      {error && <div className='text-red-600'>{error}</div>}
      <button className="cursor-pointer text-white block ml-auto mt-5 bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" type="submit">Verify Code</button>
    </form>
  </div>
  )
}




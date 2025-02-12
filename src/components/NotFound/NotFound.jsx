import React, { useEffect } from 'react'
import errImage from '../../assets/images/error.svg'

export default function NotFound() {
  useEffect(()=>{
    document.title = 'Not Found'
  },[])
  return (
    <><img src={errImage} alt="" className='block mx-auto my-5'/></>
  )
}

import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"
import  axios  from 'axios';
export const AuthContext = createContext()
export default function AuthContextProvider({children}) {
    let [token, setToken] = useState(null)
    const[decoded, setDecoded] = useState()
    async function verifyToken() {
      setToken(localStorage.getItem('token'))
      try{
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
          headers:{token}
        })
        if(res.data.message == "verified"){
          setDecoded(res.data.decoded)
          console.log(res);
        }else{
          console.log("errooor");
        }
      }
      catch(err){
        console.log(err);
        
      }
      
    }
    
    useEffect(()=>{
      setToken(localStorage.getItem('token'))
      if(token && typeof token === "string" && token.trim() !== ""){
        verifyToken()
      }
    },[token])
  return (<>
  <AuthContext.Provider value={{token, setToken, decoded}}>
    {children}
  </AuthContext.Provider>
  
  </>
  )
}

import React, { useEffect, useState } from 'react'
import useProducts from '../../Hooks/useProducts'
import { Circles } from 'react-loader-spinner'
import ProductCard from '../productCard/ProductCard'
export default function Products() {
  let {data, isLoading} = useProducts()
  useEffect(()=>{
    document.title = 'All Products'
  },[])
  return (<>
  {isLoading? <div className="flex items-center justify-center h-screen"><Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    /></div>: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-3 container mx-auto px-5">
              {data?.data.data.map((prod) => (
                <ProductCard prod={prod} key={prod.id} />
              ))}
            </div>}
  </>
  )
}

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function AllOrders() {
  const { decoded } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([])
  const{addToCart} = useContext(CartContext)
  // console.log(decoded);
  
  async function getUserOrders() {
    try{
        const res = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded?.id}`
          );
          setUserOrders(res.data)
          console.log(res.data);
    }catch(err){
        console.log(err);
        
    }
  }
  useEffect(() => {
    document.title = 'All orders'
    getUserOrders();
  }, [decoded]);
  return (
    <>
      <h1 className="text-center text-4xl font-bold my-3 text-[#0AAD0A]">
        Your Orders
      </h1>
      <div className="container my-5">
        {userOrders?.map((order)=>{return <>
        <h3 className="text-2xl font-semibold my-3">Order Date: {order.createdAt.split('T')[0]}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {order.cartItems?.map((cartOrd)=>{return <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg h-[400px] w-full"
                src={cartOrd.product.imageCover}
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {cartOrd.product.title.split(' ').slice(0, 3).join(' ')}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Quantity: {cartOrd.count}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Price: ${cartOrd.price}
              </p>
              <button
                onClick={()=>addToCart(cartOrd.product.id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#0AAD0A] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy again
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </> })}
        </div>
        
        </>})}
        
      </div>
    </>
  );
}

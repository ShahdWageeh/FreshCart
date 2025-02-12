import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CheckOut() {
  const [paymentWay, setPaymentWay] = useState();
  const { cartId, setNumOfCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(()=>{
    document.title = 'Check Out'
  },[])
  function CheckoutOrder(values) {
    if (paymentWay == "cash") {
      cashWay(values);
    } else if (paymentWay == "visa") {
      visaWay(values);
    }
    console.log(values);
  }
  async function cashWay(values) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { values },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (res.data.status == "success") {
        toast.success("order placed successfully");
        setNumOfCartItems(0);
        navigate("/allorders");
      }
      console.log(res, "cash order");
    } catch (err) {
      console.log(err);
    }
  }
  async function visaWay(values) {
    // console.log(window.location);
    
    try{
        const res = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
            { values },
            { headers: { token: localStorage.getItem("token") } }
          );
          console.log(res, "visa order");
          window.open(res.data.session.url,'_blank')
    }catch(err){
        console.log(err);
        
    }
  }
  const Formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: CheckoutOrder,
  });
  return (
    <>
      <form
        action=""
        onSubmit={Formik.handleSubmit}
        className="max-w-md mx-auto py-6"
      >
        <div className="px-8">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                Formik.setFieldValue("shippingAddress.details", e.target.value)
              }
              type="text"
              name="details"
              id="floating_details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                Formik.setFieldValue("shippingAddress.phone", e.target.value)
              }
              type="tel"
              name="phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                Formik.setFieldValue("shippingAddress.city", e.target.value)
              }
              type="text"
              name="city"
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
          </div>
          <div className="buttons">
            <button
              onClick={() => setPaymentWay("cash")}
              className="text-white bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cash
            </button>
            <button
              onClick={() => setPaymentWay("visa")}
              className="text-white ml-5 bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Visa
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

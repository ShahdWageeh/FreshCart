import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ prod }) {
  let rating = Math.round(prod.ratingsAverage);
  const {addToCart} = useContext(CartContext)
  const {addToWishlist, deleteWishlistItem, wishlistItems} = useContext(WishlistContext)
  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    const isProductInWishlist = wishlistItems?.data?.some(item => item.id === prod.id);
    setIsInWishlist(isProductInWishlist);
  }, [wishlistItems, prod.id]);
  async function handleWishlistClick() {
    try{
      if(isInWishlist){
        await deleteWishlistItem(prod.id)
        setIsInWishlist(false)
      }else{
        await addToWishlist(prod.id)
        setIsInWishlist(true)
      }
    }catch(err){
      console.log(err);
      
    }
    
  }
  return (
    <>
      <div className="hover:shadow-sm hover:shadow-[#0AAD0A] bg-white  rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/details/${prod.id}`}>
          <img
            className="p-8 rounded-t-lg h-[400px] w-full"
            src={prod.imageCover}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <div className="flex justify-between items-center">
            <div className="left">
              <a href="#" className="text-[#0AAD0A]">
                {prod.category.name}
              </a>
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {prod.title?.split(' ').slice(0, 3).join(' ')}
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {Array.from({ length: rating }, (_, index) => {
                    return (
                      <svg
                        key={index}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    );
                  })}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {prod.ratingsAverage}
                </span>
              </div>
            </div>
            <div className="wishheart cursor-pointer">
              <i onClick={handleWishlistClick} className={`fa-solid fa-heart fa-2xl on ${isInWishlist ? "text-red-500" : "text-gray-500"}`}></i>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${prod.price}
            </span>
            <button
              onClick={()=>{addToCart(prod.id)}}
              href="#"
              className="text-white bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

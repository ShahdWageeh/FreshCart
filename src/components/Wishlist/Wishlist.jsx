import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  const { getWishlistItems, wishlistItems, deleteWishlistItem } = useContext(WishlistContext);
  const {addToCart} = useContext(CartContext)
  useEffect(() => {
    document.title = 'Wishlist'
    getWishlistItems();
  }, []);

  return (
    <>
      <div className="container bg-[#F8F9FA] my-8 pb-4">
        <h1 className="text-3xl pt-5">My Wishlist</h1>
        {wishlistItems?.data?.map((item)=>{return <>
        <div className="flex flex-wrap justify-center items-center gap-3 my-3 pb-3 border-b">
          <img src={item.imageCover} className="w-[80%] h-[400px] lg:h-[200px] lg:w-[20%]" alt="" />
          <div className="flex items-start justify-between w-[80%] mt-3 lg:w-[60%]">
            <div>
              <h3 className="text-2xl font-bold">{item?.title?.split(' ').slice(0, 3).join(' ')}</h3>
              <p className="text-[#0AAD0A] font-semibold my-2">${item.price}</p>
              <button onClick={()=>deleteWishlistItem(item.id)} className="text-red-700"><i className="fa-solid fa-trash"></i>Remove</button>
            </div>
            <button onClick={()=>addToCart(item.id)} className="border border-[#0AAD0A] py-2 px-4 rounded-md">Add to cart</button>
          </div>
        </div>
        </>})}
        
      </div>
    </>
  );
}

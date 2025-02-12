import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import useProducts from "../../Hooks/useProducts";
import ProductCard from "../productCard/ProductCard";

export default function ProductDetails() {
  let [details, setDetails] = useState();
  const [CatName, setCatName] = useState()
  let { id } = useParams();
  const {addToCart} = useContext(CartContext)
  const {addToWishlist, deleteWishlistItem, wishlistItems} = useContext(WishlistContext)
  const [isInWishlist, setIsInWishlist] = useState(false);
  const {data, isLoading} = useProducts()
  console.log(data?.data.data);
  const relatedProducts = data?.data.data.filter((product)=> product.category.name === CatName)
  console.log(relatedProducts);
  
  
    useEffect(() => {
      const isProductInWishlist = wishlistItems?.data?.some(item => item.id === id);
      setIsInWishlist(isProductInWishlist);
    }, [wishlistItems, id]);
    async function handleWishlistClick() {
      try{
        if(isInWishlist){
          await deleteWishlistItem(id)
          setIsInWishlist(false)
        }else{
          await addToWishlist(id)
          setIsInWishlist(true)
        }
      }catch(err){
        console.log(err);
        
      }
      
    }
  async function getProductDetails() {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(res.data.data);
    setCatName(res.data.data.category.name)
    console.log(res.data.data);
    console.log(res.data.data.category.name);
  }
  useEffect(() => {
    document.title = 'Product Details'
    getProductDetails();
  }, []);
  return (
    <>
      <div className="container my-8 px-5">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full lg:w-1/3 pr-3">
            <Swiper
              slidesPerView={1}
              loop={true}
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              {details?.images.map((img) => {
                return (
                  <SwiperSlide>
                    <img src={img} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="text-4xl">{details?.title}</h2>
            <h3 className="text-2xl text-gray-800">{details?.description}</h3>
            <p className="mt-5">{details?.category.name}</p>
            <div className="flex justify-between items-center ">
              <p>${details?.price}</p>
              <p className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <span>{details?.ratingsAverage}</span>
              </p>
            </div>
            <div className="mt-5 flex items-center">
              <button
                onClick={()=>{addToCart(id)}}
                href="#"
                className="text-white w-[90%] inline-block bg-[#0AAD0A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>
              <i onClick={handleWishlistClick} className={`fa-solid fa-heart fa-2xl on ${isInWishlist ? "text-red-500" : "text-gray-500"}`}></i>
            </div>
          </div>
        </div>
        <h2 className="text-3xl mt-8 text-[#0AAD0A] font-bold">Related Products</h2>
        {isLoading? <div className="flex items-center justify-center h-screen"><Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            /></div>: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-3 mx-auto">
                      {relatedProducts.map((prod) => (
                        <ProductCard prod={prod} key={prod.id} />
                      ))}
                    </div>}
      </div>
    </>
  );
}

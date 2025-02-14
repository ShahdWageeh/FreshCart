import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import { Blocks } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import static1 from '../../assets/images/blog-img-1.jpeg'
import static2 from '../../assets/images/blog-img-2.jpeg'
import useCategories from "../../Hooks/useCategories";
import useProducts from "../../Hooks/useProducts";
export default function Home() {
  let [allProducts, setAllProducts] = useState([]);
  let [loader, setLoader] = useState(false);
  let {catData, catLoading} = useCategories()
  let {data, isLoading} = useProducts()
  useEffect(()=>{
    document.title = 'Home'
  },[])
  return (
    <>
      {/* slider1 */}
      <div className="container my-5 px-10">
        <div className="lg:grid lg:grid-cols-6">
          <div className="col-span-4">
            <Swiper slidesPerView={1} loop={true} className="lg:h-[100%]"
            modules={[Pagination]} pagination={{clickable:true}}>
              <SwiperSlide className="h-full">
                <img src={slide1} alt="" className="w-full h-full block" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={slide2} alt="" className="w-full h-full block" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={slide3} alt="" className="w-full h-full block" />
              </SwiperSlide>
            </Swiper>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
          <div className="col-span-2">
            <img src={static1} alt="" className="h-1/2"/>
            <img src={static2} alt="" className="h-1/2"/>
          </div>
        </div>
      </div>
      {/* slider1 */}
      {/* slider2 */}
      <div className="container my-8 px-10">
        <h2 className="text-2xl">Shop Popular Categories</h2>
        <Swiper slidesPerView={1} loop={true} className="my-4 pb-4" 
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 6,
            },
          }}>
          {catData?.data.data.map((cat)=> <SwiperSlide key={cat._id}>
            <img src={cat.image} alt="" className="w-full h-[400px]" />
            <p>{cat.name}</p>
          </SwiperSlide>)}
        </Swiper>
      </div>
      {/* slider2 */}
      {/* all products */}
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Blocks
            height="80"
            width="80"
            color="#0AAD0A"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-3 container mx-auto px-5">
          {data?.data.data.map((prod) => (
            <ProductCard prod={prod} key={prod.id} />
          ))}
        </div>
      )}
      {/* allproducts */}
    </>
  );
}

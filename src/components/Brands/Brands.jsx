import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Circles } from "react-loader-spinner";

export default function Brands() {
  const [modal, setModal] = useState(false);
  const [specData, setSpecData] = useState();
  async function toggleModal(id) {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    setSpecData(res.data.data);
    setModal(!modal);
  }
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data: brandsData, isLoading } = useQuery({
    queryKey: "allBrands",
    queryFn: getAllBrands,
  });
  useEffect(()=>{
    document.title = 'Brands'
  },[])
  return (
    <>
      <h1 className="text-center text-4xl font-semibold text-[#0AAD0A] my-5">
        All Brands
      </h1>
      <div className="container pb-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandsData?.data.data.map((brand) => {
              return (
                <>
                  <div
                    onClick={() => toggleModal(brand._id)}
                    className="hover:shadow-sm hover:shadow-[#0AAD0A] cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div>
                      <img className="rounded-t-lg mx-auto" src={brand.image} alt="" />
                    </div>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {brand.name}
                        </h5>
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
      {modal ? (
        <div
          onClick={() => toggleModal(specData._id)}
          className="fixed inset-0 w-full h-screen flex justify-center items-center bg-black/40 z-[99]"
        >
          <div className="bg-white w-1/2">
            <i className="fa-solid fa-xmark fa-2xl p-6"></i>
            <img src={specData.image} alt="" className="mx-auto" />
          </div>
        </div>
      ) : null}
    </>
  );
}

import React, { useEffect, useState } from "react";
import useCategories from "../../Hooks/useCategories";
import { Circles } from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  let { catData, catLoading } = useCategories();
  let [subCat, setSubCat] = useState()
  let [catName, setCatName] = useState()
  console.log(catData);
  async function getSubCategories(id, name){
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setSubCat(res.data.data)
    setCatName(name)
  }
  useEffect(()=>{
    document.title = 'Categories'
  },[])
  return (
    <>
      {catLoading ? (
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
        <div className="container my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catData?.data.data.map((cat) => {
              return (
                <>
                  <div
                    onClick={()=>getSubCategories(cat._id, cat.name)}
                    key={cat.name}
                    className="max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-sm hover:shadow-[#0AAD0A] dark:bg-gray-800 dark:border-gray-700"
                  >
                    <a href="#">
                      <img
                        className="rounded-t-lg w-full h-[300px]"
                        src={cat.image}
                        alt=""
                      />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {cat.name}
                        </h5>
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
      {subCat? <div className="container pb-5">
        <h2 className="text-4xl text-center text-[#0AAD0A] my-4">{catName} SubCategories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subCat.map((subcateg)=>{return <>
          <h2 className="text-3xl border text-center py-3 rounded shadow-sm hover:shadow-[#0AAD0A]">{subcateg.name}</h2>
          </>})}
        </div>
      </div>:null }
    </>
  );
}

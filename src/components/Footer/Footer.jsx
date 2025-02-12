import React from "react";
import partners from '../../assets/images/Capture.jpeg'
import googleplay from '../../assets/images/googleplay.png'
import appstore from '../../assets/images/applestore.png'

export default function Footer() {
  return (
    <>
      <footer className="bg-fuchsia-100/50 px-10 py-5">
        <div className="container">
          <h2 className="text-2xl">Get the FreshCart app</h2>
          <p className="text-gray-500">
            We will send you a link, open it on your phone and download the app
          </p>
          <div className="contact py-3 flex justify-between gap-3 w-[99%] ml-auto">
            <input
              type="text"
              placeholder="Email"
              className="bg-white pl-2 py-1 rounded-md w-[80%] border-0"
            />
            <button className="bg-[#0AAD0A] rounded-md text-white py-1 w-[20%] cursor-pointer ">
              Share App link
            </button>
          </div>
          <div className="w-[99%] ml-auto my-2.5 lg:flex lg:justify-between lg:items-center border-y-1 border-gray-200">
            <div className="md:flex md:items-center md:gap-2.5 ">
              <p className="text-gray-700">Payment Partners</p>
              <img src={partners} alt="" className="w-48" />
            </div>
            <div className="md:flex md:items-center md:gap-2 mt-3 md:mt-0">
              <p className="text-gray-700">Get deliveries with FreshCart</p>
              <img src={appstore} alt="" className="w-32"/>
              <img src={googleplay} alt="" className="w-32" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

import React, { useEffect, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { numOfCartItems, getCartItems } = useContext(CartContext);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  function toggleNav() {
    setNavOpen(!navOpen);
  }
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      <nav className="px-10 py-2.5 bg-fuchsia-100/60">
        <div className="flex flex-wrap items-center justify-between">
          <img src={logo} alt="" className="hidden md:flex" />
          <div className="md:hidden flex items-center justify-between w-full gap-3">
            {token ? (
              <i
                onClick={toggleNav}
                className="fa-solid fa-bars text-2xl cursor-pointer"
              ></i>
            ) : null}

            <div className="credits flex items-center gap-4">
              {token ? (
                <button
                  className="bg-[#0AAD0A] px-2 rounded-md text-white"
                  onClick={logout}
                >
                  LogOut
                </button>
              ) : (
                <>
                  <Link to="login">Login</Link>
                  <Link to="register" className="mx-3">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          {token ? (
            <>
              <ul className="hidden md:flex space-x-4">
                <li>
                  <Link to="/" className="text-gray-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="cart" className="text-gray-600">
                    Cart
                    {numOfCartItems != 0 ? (
                      <sup className="bg-[#0AAD0A] px-1 text-white rounded-full">
                        {numOfCartItems}
                      </sup>
                    ) : null}
                  </Link>
                </li>
                <li>
                  <Link to="wishlist" className="text-gray-600">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="allorders" className="text-gray-600">
                    AllOrders
                  </Link>
                </li>
                <li>
                  <Link to="products" className="text-gray-600">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="categories" className="text-gray-600">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="brands" className="text-gray-600">
                    Brands
                  </Link>
                </li>
              </ul>
              {navOpen ? (
                <ul className="d-block w-full md:hidden">
                  <li>
                    <Link to="/" className="text-gray-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="cart" className="text-gray-600">
                      Cart
                      {numOfCartItems != 0 ? (
                        <sup className="bg-[#0AAD0A] px-1 text-white rounded-full">
                          {numOfCartItems}
                        </sup>
                      ) : null}
                    </Link>
                  </li>
                  <li>
                    <Link to="wishlist" className="text-gray-600">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="allorders" className="text-gray-600">
                      AllOrders
                    </Link>
                  </li>
                  <li>
                    <Link to="products" className="text-gray-600">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="categories" className="text-gray-600">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="brands" className="text-gray-600">
                      Brands
                    </Link>
                  </li>
                </ul>
              ) : null}
            </>
          ) : null}

          <div className="credits hidden md:flex items-center gap-4 ">
            {token ? (
              <button
                className="bg-[#0AAD0A] px-2 rounded-md text-white"
                onClick={logout}
              >
                LogOut
              </button>
            ) : (
              <>
                <Link to="login">Login</Link>
                <Link to="register" className="mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* <nav className='px-10 py-2.5 bg-fuchsia-100/60'>
    <div className='flex flex-wrap items-center justify-between container'>
      <div className='links flex  items-center gap-2 '>
      <img src={logo} alt="" />
      {token ? <ul className='flex gap-1.5'>
        <li><Link to="/" className='text-gray-600'>Home</Link></li>
        <li><Link to="cart" className='text-gray-600'>Cart{numOfCartItems!=0?<sup className='bg-[#0AAD0A] px-1 text-white rounded-full'>{numOfCartItems}</sup>:null}</Link></li>
        <li><Link to="wishlist" className='text-gray-600'>Wishlist</Link></li>
        <li><Link to="products" className='text-gray-600'>Products</Link></li>
        <li><Link to="categories" className='text-gray-600'>Categories</Link></li>
        <li><Link to="brands" className='text-gray-600'>Brands</Link></li>
      </ul>:null}
      
      </div>
      <div className="social flex items-center">
      <i className="fa-brands fa-square-instagram"></i>
      <i className="fa-brands fa-facebook mx-3"></i>
      <i className="fa-brands fa-tiktok"></i>
      <i className="fa-brands fa-twitter mx-3"></i>
      <i className="fa-brands fa-linkedin"></i>
      <i className="fa-brands fa-youtube mx-3"></i>
      <div className="credits">
        {token ? <button onClick={logout}>LogOut</button>: <>
        <Link to="login">Login</Link>
        <Link to="register" className='mx-3'>Register</Link>
        </>}
      </div>
      </div>
    </div>
    
  </nav> */}
    </>
  );
}

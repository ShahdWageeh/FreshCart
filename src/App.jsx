import React, { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import AuthContextProvider from './components/context/AuthContext';
import Guard from './components/Guard/Guard';
import AuthGuard from './components/AuthGuard/AuthGuard';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/productDetails/ProductDetails';
import CartContextProvider from './components/context/CartContext';
import { Toaster } from 'react-hot-toast';
import Wishlist from './components/Wishlist/Wishlist';
import CheckOut from './components/checkout/CheckOut';
import AllOrders from './components/allorders/AllOrders';
import WishlistContextProvider from './components/context/WishlistContext';
import ForgetPass from './components/forgetPass/ForgetPass';
import ResetCode from './components/resetCode/ResetCode';
import ResetPass from './components/resetPass/ResetPass';

const queryClient = new QueryClient()
const routes = createBrowserRouter([
  {path:'', element:<Layout/>,children:[
    {path:'', element:<Guard><Home/></Guard>},
    {path:'cart', element:<Guard><Cart/></Guard>},
    {path:'wishlist', element:<Guard><Wishlist/></Guard>},
    {path:'products', element:<Guard><Products/></Guard>},
    {path:'categories', element:<Guard><Categories/></Guard>},
    {path:'brands', element:<Guard><Brands/></Guard>},
    {path:'checkout', element:<Guard><CheckOut/></Guard>},
    {path:'allorders', element:<Guard><AllOrders/></Guard>},
    {path:'details/:id', element:<Guard><ProductDetails/></Guard>},
    {path:'login', element:<AuthGuard><Login/></AuthGuard>},
    {path:'forgotpassword', element:<AuthGuard><ForgetPass/></AuthGuard>},
    {path:'resetcode', element:<AuthGuard><ResetCode/></AuthGuard>},
    {path:'resetpassword', element:<AuthGuard><ResetPass/></AuthGuard>},
    {path:'register', element:<AuthGuard><Register/></AuthGuard>},
    {path:'*', element:<NotFound/>},
  ]}
])

function App() {
  return (
    <>
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster/>
          </QueryClientProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App

import React, { createContext, useState } from 'react'
import axios  from 'axios';
import toast from 'react-hot-toast';
export const CartContext =  createContext()
export default function CartContextProvider({children}) {
    const [numOfCartItems, setNumOfCartItems] = useState()
    const [cartItems, setCartItems] = useState([])
    const [cartId, setCartId] = useState()
    async function addToCart(productId){
        try{
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {productId}, 
        {headers:{token:localStorage.getItem('token')}})
        if(res.data.status == "success"){
            toast.success('Product added Successfully')
            setNumOfCartItems(res.data.numOfCartItems)
        }
        }catch(err){
            toast.error('can’t add to cart')
            console.log(err);
        }
    };
    async function getCartItems() {
        try{
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', 
                {headers:{token:localStorage.getItem('token')}})
                if(res.data.status == "success"){
                    setCartItems(res.data.data)
                    setNumOfCartItems(res.data.numOfCartItems)
                    setCartId(res.data.cartId)
                }
            console.log(res);
        }catch(err){
            console.log(err);
            
        }
    }
    async function updateCart(id,count){
        try{
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
                headers:{token:localStorage.getItem('token')}
            })
            if(res.data.status == "success"){
                setCartItems(res.data.data)
                setNumOfCartItems(res.data.numOfCartItems)
            }
        }catch(err){
            console.log(err);
            
        }
        
    }
    async function deleteItem(id){
        try{
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {headers:{token:localStorage.getItem('token')}}
            )
            if(res.data.status == "success"){
                setCartItems(res.data.data)
                setNumOfCartItems(res.data.numOfCartItems)
            }
        }catch(err){
            console.log(err);
        }
    }
    async function deleteAllCart() {
        try{
            const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
                headers:{token:localStorage.getItem('token')}
            })
            if(res.data.message == "success"){
                setCartItems([])
                setNumOfCartItems(0)
                getCartItems()
            }
            
        }catch(err){
            console.log(err);
            
        }
    }
  return (
    <>
    <CartContext.Provider value={{addToCart, numOfCartItems, setNumOfCartItems, getCartItems,cartItems, updateCart, deleteItem, deleteAllCart, cartId}}>
        {children}
    </CartContext.Provider>
    </>
  )
}

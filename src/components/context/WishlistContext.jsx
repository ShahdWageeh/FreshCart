import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast'

export const WishlistContext = createContext()
export default function WishlistContextProvider({children}) {
    const [wishlistItems, setWishlistItems] = useState([])
    const [IsAdded, setIsAdded] = useState(false)
    async function addToWishlist(productId){
        try{
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {productId},
                {headers:{token:localStorage.getItem('token')}})
                if(res.data.status == "success"){
                    toast.success('Product added to wishlist')
                    setIsAdded(true)
                }
            console.log(res);
        }catch(err){
            console.log(err);
            
        }
    }
    async function getWishlistItems(){
        try{
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
                {headers:{token:localStorage.getItem('token')}})
                if(res.data.status == "success"){
                    setWishlistItems(res.data)
                }
            console.log(res.data);
        }catch(err){
            console.log(err);
            
        }
    }
    async function deleteWishlistItem(id){
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
            {headers:{token:localStorage.getItem('token')}}
        )
        if(res.data.status == "success"){
            toast.error('Product removed from wishlist')
            setWishlistItems(res?.data)
            setIsAdded(false)
            getWishlistItems()
        }
        console.log(res);
        
    }
  return (
    <>
    <WishlistContext.Provider value={{addToWishlist, getWishlistItems, wishlistItems, deleteWishlistItem, IsAdded}}>
        {children}
    </WishlistContext.Provider>
    </>
  )
}

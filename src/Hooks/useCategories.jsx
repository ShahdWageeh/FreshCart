import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function useCategories() {
    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const {data:catData, isLoading:catLoading} = useQuery({
    queryKey:"allcategories",
    queryFn: getAllCategories,
  })
  return {catData, catLoading}
}

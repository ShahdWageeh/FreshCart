import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function useProducts() {
    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      }
      const { data, isLoading } = useQuery({
        queryKey: "allproducts",
        queryFn: getAllProducts,
        cacheTime: 50000,
        retry: 3,
        retryDelay: 2000,
      });
  return {data, isLoading, }
}

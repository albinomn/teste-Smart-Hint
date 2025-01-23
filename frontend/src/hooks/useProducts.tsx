import { fetchProducts } from "@/products.fetcher"
import { useQuery } from "@tanstack/react-query"

export const useProducts = () => 
   useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })

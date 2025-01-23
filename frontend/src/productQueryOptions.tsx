import { queryOptions } from "@tanstack/react-query"
import { fetchProducts } from "./products.fetcher"

export const productsQueryOptions = () => 
  queryOptions({
    queryKey: ['products'],
    queryFn: () => fetchProducts()
  })

export type Product = {
  id: string
  image:string
  name: string
  ean: string
  price: string
  description: string
  created_at: string
}

type response = {
  products: Product[]
}

export class ProductsNotFound extends Error {}

export const fetchProducts = async ():Promise<response> => {
  const response = await fetch('http://127.0.0.1:5000/products')
  return await response.json()
}
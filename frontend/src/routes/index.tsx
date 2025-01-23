import { ProductTable } from '@/components/ui/product-table'
import { SearchGroup } from '@/components/ui/search-group'
import { useProducts } from '@/hooks/useProducts'
import { Box, Button, Heading } from '@chakra-ui/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {data, isFetching} = useProducts()
  const [search, setSearch] = useState(false)

  function handleFilterButton() {
    setSearch(!search)
  }

  return (
    <>
      <Heading fontSize="lg" mb={4} color="black" fontWeight="bold">
        Consulte os seus Produtos cadastrados na sua Loja ou realize o cadastro de novos Produtos
      </Heading>
      <Box my="3">
        <Button variant="ghost" colorPalette="blue">
          <Link to='/product/create' preload="intent" >Criar produto</Link>
          </Button>
        <Button variant="ghost" colorPalette="blue" onClick={handleFilterButton}>Filtrar</Button>
      </Box>
      {search && <SearchGroup />}
      {!isFetching && data ? <ProductTable products={data.products} /> : 'Loading...'}      
    </>
  )
}

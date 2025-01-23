import { Heading } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Heading fontSize="lg" mb={4} color="blue.500" fontWeight="bold">
      Consulte os seus Produtos cadastrados na sua Loja ou realize o cadastro de novos Produtos
    </Heading>
  )
}

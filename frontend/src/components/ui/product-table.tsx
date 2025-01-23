import { Product } from "@/products.fetcher";
import { Heading, HStack, IconButton, Image, Stack, Table } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "./pagination";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => (
<Stack w="full" gap={5} mt={"55px"}>
  <Table.Root interactive>
    <Table.Row>
      <Table.ColumnHeader>Imagem</Table.ColumnHeader>
      <Table.ColumnHeader>Nome</Table.ColumnHeader>
      <Table.ColumnHeader>EAN</Table.ColumnHeader>
      <Table.ColumnHeader>Data de cadastro</Table.ColumnHeader>
      <Table.ColumnHeader>Ações</Table.ColumnHeader>
    </Table.Row>
    <Table.Body>
      {products.length === 0 ? <Heading>Nenhum produto cadastrado ainda!</Heading> : products.map((produto) => (
        <Table.Row key={produto.id}>
          <Table.Cell><Image h="50px" src={produto.image} /></Table.Cell>
          <Table.Cell>{produto.name}</Table.Cell>
          <Table.Cell>{produto.ean}</Table.Cell>
          <Table.Cell>{produto.created_at}</Table.Cell>
          <Table.Cell>
            <HStack>
              <IconButton color="black" variant="plain">
                <Link to="/product/$productId/edit" params={{ productId: produto.ean}} preload="intent">
                  <FaRegEdit />
                </Link>
              </IconButton>
              <IconButton color="red.500" variant="plain">
                <FaRegTrashAlt />
              </IconButton>
            </HStack>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
  <PaginationRoot count={products.length} pageSize={20} page={1}>
    <HStack wrap="wrap">
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </HStack>
  </PaginationRoot>
</Stack>
)
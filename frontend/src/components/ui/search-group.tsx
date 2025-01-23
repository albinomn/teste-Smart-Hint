import { Group, IconButton, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const SearchGroup = () => (
<Group attached>
  <Input 
    w="md"
    placeholder="Busque por nome do produto"
    _placeholder={{ color: "blue.600" }}
    borderColor="blue.300"
    _hover={{ borderColor: "blue.400" }}
    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
  />
  <IconButton
    aria-label="Search products"
    colorScheme="blue"
    bg="blue.500"
    _hover={{ bg: "blue.600" }}
    >
    <FaSearch />
  </IconButton>
</Group>
)
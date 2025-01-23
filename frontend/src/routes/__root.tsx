import { Toaster } from "@/components/ui/toaster";
import { Box, Flex } from "@chakra-ui/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({component: rootComponent});

function rootComponent() {
  return (
    <>
    <Flex justify="center" w="100%" bg="blue.50" minH="100vh">
      <Box maxW={{ base: "100%", md: "1080px" }} w="100%" p={6} bg="white" boxShadow="lg" borderRadius={{xl: 'md'}} my={{xl: 2}}>
        <Toaster />
        <Outlet />
      </Box>
    </Flex>
    </>
)}
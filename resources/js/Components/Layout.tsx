import { type ContainerProps, Avatar, Button, Card, Container, HStack, Image, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import { type ReactNode } from "react";

export default function Layout({ children, ...props }: ContainerProps) {
  const toast = useToast({
    status: "error",
  });

  const doToast = () => toast({ description: "Waktu pemilihan masih belum dimulai. Mohon harap bersabar.", });

  return <>
    <Card p={4}>
      <HStack>
        <Image src="/assets/logo-nm.png" boxSize={10} />
        <HStack gap={0} ml={2}>
          <Button variant="ghost" isActive>Beranda</Button>
          <Button variant="ghost" onMouseUp={ () => doToast() }>Mulai Voting</Button>
          <Button variant="ghost" onMouseUp={ () => doToast() }>Hasil Pemilihan</Button>
        </HStack>
        <HStack gap={0} ml="auto">
          <Button variant="ghost">Bantuan</Button>
          <Button variant="ghost" isDisabled>Dashboard</Button>
          <Menu>
            <MenuButton as={Button} leftIcon={<Avatar name='RA' size="sm" />} variant="ghost" colorScheme="gray">
              Rizky Agustin
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.post("/auth/logout")}>Keluar</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Card>
    <Container maxW="container.xl" pt={6} {...props}>
      { children }
    </Container>
  </>;
}

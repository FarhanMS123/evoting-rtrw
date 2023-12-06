import { type ContainerProps, type MenuItemProps, type ButtonProps, Avatar, Button, Card, Container, HStack, Image, Menu, MenuButton, MenuItem, MenuList, useToast, MenuDivider } from "@chakra-ui/react";
import { router } from "@inertiajs/react";

const StyledButton = ({ children, ...props }: ButtonProps) => (<Button variant="ghost" display={{ base: "none", lg: "block" }} {...props}>{ children }</Button>)
const StyledMenuList = ({ children, ...props }: MenuItemProps) => (<MenuItem display={{ lg: "none" }} {...props}>{ children }</MenuItem>)

export default function Layout({ children, ...props }: ContainerProps) {
  const toast = useToast({
    status: "error",
  });

  const doToast = () => toast({ description: "Waktu pemilihan masih belum dimulai. Mohon untuk menunggu hingga waktu yang telah ditentuan.", });

  return <>
    <Card p={4} borderRadius={0}>
      <HStack>
        <Image src="/assets/logo-nm.png" boxSize={10} />
        <HStack gap={0} ml={2}>
          <StyledButton isActive>Beranda</StyledButton>
          <StyledButton onMouseUp={ () => doToast() }>Mulai Voting</StyledButton>
          <StyledButton onMouseUp={ () => doToast() }>Hasil Pemilihan</StyledButton>
        </HStack>
        <HStack gap={0} ml="auto">
          <StyledButton>Bantuan</StyledButton>
          <StyledButton>Dashboard</StyledButton>
          <Menu>
            <MenuButton as={Button} leftIcon={<Avatar name='RA' size="sm" />} variant="ghost" colorScheme="gray">
              Rizky Agustin
            </MenuButton>
            <MenuList zIndex={1000}>
              <StyledMenuList bg="red.100">Beranda</StyledMenuList>
              <StyledMenuList>Mulai Voting</StyledMenuList>
              <StyledMenuList>Hasil Pemilihan</StyledMenuList>
              <MenuDivider display={{ lg: "none" }} />
              <StyledMenuList>Dashboard</StyledMenuList>
              <StyledMenuList>Bantuan</StyledMenuList>
              <MenuItem onClick={() => router.post("/auth/logout")}>Keluar</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Card>
    <Container maxW="container.xl" py={6} {...props}>
      { children }
    </Container>
  </>;
}

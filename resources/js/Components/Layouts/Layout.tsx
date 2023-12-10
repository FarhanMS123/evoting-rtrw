import { type ContainerProps, type MenuItemProps, type ButtonProps, Avatar, Button, Card, Container, HStack, Image, Menu, MenuButton, MenuItem, MenuList, useToast, MenuDivider } from "@chakra-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useMemo } from "react";

const StyledButton = ({ children, href, linkMatch, ...props }: {
  href: string;
  linkMatch?: RegExp;
} & ButtonProps) => {
  const page = usePage();
  const isActive = useMemo(() => {
    let link = href.split(/(#|\?)/)[0];
    let matcher = link.length > 0 ? new RegExp(`^${ link }(\\?.*)?$`) : new RegExp("^\0");
    return (linkMatch ?? matcher).test(page.url);
  }, [ href, linkMatch, page ]);

  return (
    <Link href={href}>
      <Button variant="ghost" display={{ base: "none", lg: "block" }} isActive={isActive} {...props}>{ children }</Button>
    </Link>
  );
}
const StyledMenuList = ({ children, href, linkMatch, ...props }: {
  href: string;
  linkMatch?: RegExp;
} & MenuItemProps) => {
  const page = usePage();
  const isActive = useMemo(() => {
    let link = href.split(/(#|\?)/)[0];
    let matcher = link.length > 0 ? new RegExp(`^${ link }(\\?.*)?$`) : new RegExp("^\0$");
    return (linkMatch ?? matcher).test(page.url);
  }, [ href, linkMatch, page ]);

  return (
    <Link href={href}>
      <MenuItem display={{ lg: "none" }} bg={ isActive ? "red.100" : undefined } {...props}>{ children }</MenuItem>
    </Link>
  );
}

export type UserData = {
  nik: string;
  nama: string;
  alamat: string;
  pekerjaan: string;
  jenis_kelamin: "laki-laki" | "perempuan";
  telepon?: string;
  password: string;
  is_admin?: boolean;
  non_villager?: boolean;
};

export type DefaultPageProps = {
  app_debug: boolean;
  auth: {
    user: UserData | null;
  };
};

export default function Layout({ children, ...props }: ContainerProps) {
  const { props: { auth } } = usePage<DefaultPageProps>();
  const toast = useToast({
    status: "error",
  });

  const doToast = () => toast({ description: "Waktu pemilihan masih belum dimulai. Mohon untuk menunggu hingga waktu yang telah ditentuan.", });

  return <>
    <Card p={4} borderRadius={0}>
      <HStack>
        <Image src="/assets/logo-nm.png" boxSize={10} />
        <HStack gap={0} ml={2}>
          <StyledButton href="/">Beranda</StyledButton>
          <StyledButton href="/pemilihan">Mulai Voting</StyledButton>
          <StyledButton href="" onMouseUp={ () => doToast() }>Hasil Pemilihan</StyledButton>
        </HStack>
        <HStack gap={0} ml="auto">
          <StyledButton href="" isDisabled>Bantuan</StyledButton>
          <StyledButton href="/dashboard" linkMatch={/^\/dashboard\/.*/}>Dashboard</StyledButton>
          <Menu>
            <MenuButton as={Button} leftIcon={<Avatar name={ auth.user?.nama } size="sm" />} variant="ghost" colorScheme="gray">
              { auth.user?.nama }
            </MenuButton>
            <MenuList zIndex={1000}>
              <StyledMenuList href="/">Beranda</StyledMenuList>
              <StyledMenuList href="">Mulai Voting</StyledMenuList>
              <StyledMenuList href="">Hasil Pemilihan</StyledMenuList>
              <MenuDivider display={{ lg: "none" }} />
              <StyledMenuList href="/dashboard" linkMatch={/^\/dashboard\/.*/}>Dashboard</StyledMenuList>
              <StyledMenuList href="" isDisabled>Bantuan</StyledMenuList>
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

/// <reference types="vite-plugin-svgr/client" />
import { type ContainerProps, type MenuItemProps, type ButtonProps,
    Avatar, Button, Card, Container, HStack, Image, Menu, MenuButton,
    MenuItem, MenuList, useToast, MenuDivider, Wrap, WrapItem,
    WrapItemProps, Portal } from "@chakra-ui/react";
import { type InertiaLinkProps, Link, router, usePage } from "@inertiajs/react";
import { useMemo } from "react";
import Footer from "./Footer";

const useLink = ({ href, linkMatch }: {
  href: string;
  linkMatch?: RegExp;
}) => {
  const page = usePage();
  const isActive = useMemo(() => {
    let link = href.split(/(#|\?)/)[0];
    let matcher = link.length > 0 ? new RegExp(`^${ link }(\\?.*)?$`) : new RegExp("^\0");
    return (linkMatch ?? matcher).test(page.url);
  }, [ href, linkMatch, page ]);

  return {
    page, isActive, href, linkMatch,
  };
}

const StyledButton = ({ children, href, linkMatch, ...props }: {
  href: string;
  linkMatch?: RegExp;
} & ButtonProps) => {
  const { isActive } = useLink({ href, linkMatch });

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
  const { isActive } = useLink({ href, linkMatch });

  return (
    <Link href={href}>
      <MenuItem display={{ lg: "none" }} bg={ isActive ? "red.100" : undefined } {...props}>{ children }</MenuItem>
    </Link>
  );
}

const WrapButton = ({ children, href, linkMatch, linkProps, wrapItemProps, ...props }: {
  href: string;
  linkMatch?: RegExp;
  linkProps?: InertiaLinkProps;
  wrapItemProps?: WrapItemProps;
} & ButtonProps) => {
  const { isActive } = useLink({ href, linkMatch });

  return (
    <WrapItem {...wrapItemProps}>
      <Link href={href} {...linkProps}>
        <Button colorScheme="blue" size='sm' isActive={isActive} px={2} {...props}>{ children }</Button>
      </Link>
    </WrapItem>
  );
};

export type UserData = {
  nik: string;
  nama: string;
  alamat: string;
  pekerjaan: string;
  jenis_kelamin: "laki-laki" | "perempuan";
  email?: string;
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
  show_utils: boolean;
};

export default function Layout({ children, disableFooter, ...props }: {
  disableFooter?: boolean;
} & ContainerProps) {
  const { props: { auth, show_utils } } = usePage<DefaultPageProps>();
  const toast = useToast({
    status: "error",
  });
  const isAdmin = Boolean(auth.user?.is_admin);

  const doToast = () => toast({ description: "Waktu pemilihan masih belum dimulai. Mohon untuk menunggu hingga waktu yang telah ditentuan.", });

  return <>
    <Card p={4} borderRadius={0}>
      <HStack>
        <Image src="/assets/logo-nm.png" boxSize={10} />
        <HStack gap={0} ml={2}>
          { !isAdmin && <StyledButton href="/">Beranda</StyledButton> }
          { isAdmin && <>
            <StyledButton href="/dashboard/users" linkMatch={/^\/dashboard\/users(\/.*)?/}>Kelola Warga</StyledButton>
            <StyledButton href="/dashboard/calons" linkMatch={/^\/dashboard\/calons(\/.*)?/}>Kelola Calon</StyledButton>
          </> }
          { (!isAdmin || show_utils) && <>
            <StyledButton href="/pemilihan">Mulai Pemilihan</StyledButton>
            <StyledButton href="/hasil-pemilihan">Hasil Pemilihan</StyledButton>
          </> }
        </HStack>
        <HStack gap={0} ml="auto">
          {/* <StyledButton href="/dashboard" linkMatch={/^\/dashboard\/.*$/}>Dashboard</StyledButton> */}
          <Menu>
            <MenuButton as={Button} leftIcon={<Avatar name={ auth.user?.nama } size="sm" />} variant="ghost" colorScheme="gray">
              { auth.user?.nama }
            </MenuButton>
            <Portal>
              <MenuList zIndex={1000}>
                <StyledMenuList href="/">Beranda</StyledMenuList>
                <StyledMenuList href="/pemilihan">Mulai Pemilihan</StyledMenuList>
                <StyledMenuList href="/hasil-pemilihan">Hasil Pemilihan</StyledMenuList>
                <MenuDivider display={{ lg: "none" }} />
                <StyledMenuList href="/dashboard" linkMatch={/^\/dashboard\/.*/}>Dashboard</StyledMenuList>
                <MenuItem onClick={() => router.post("/auth/logout")}>Keluar</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </HStack>
      </HStack>
    </Card>

    <Container maxW="container.xl" py={6} {...props}>
      <Wrap mb={2} display={{ lg: "none" }} sx={{ ".chakra-wrap__list": { gap: 0, } }}>
        <WrapButton href="/">Beranda</WrapButton>
        { (!isAdmin || show_utils) && <>
          <WrapButton href="/pemilihan">Mulai Pemilihan</WrapButton>
          <WrapButton href="/hasil-pemilihan">Hasil Pemilihan</WrapButton>
        </> }
        <WrapButton href="#1" onClick={(e) => {e.preventDefault(); router.post("/auth/logout");}}>Keluar</WrapButton>
      </Wrap>
      { isAdmin && <Wrap mb={6} display={{ lg: "none" }} sx={{ ".chakra-wrap__list": { gap: 0, } }}>
        <WrapButton href="/dashboard/users" colorScheme="pink" linkMatch={/^\/dashboard\/users(\/.*)?/}>Kelola Warga</WrapButton>
        <WrapButton href="/dashboard/calons" colorScheme="pink" linkMatch={/^\/dashboard\/calons(\/.*)?/}>Kelola Calon</WrapButton>
      </Wrap> }

      { children }
    </Container>

    { !disableFooter && <Footer bodyProps={{ flexDirection: ["column", "row"], alignItems: ["left", "center"] }} /> }
  </>;
}

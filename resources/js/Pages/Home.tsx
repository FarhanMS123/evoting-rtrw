import { Avatar, Button, Card, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";
import { router } from "@inertiajs/react";

export default function Home() {
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
  </>;
}

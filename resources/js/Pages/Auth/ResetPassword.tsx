import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, HStack, Heading, IconButton, Image, Input, InputGroup, InputRightAddon, Wrap, useBoolean } from "@chakra-ui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderPemilu from "~/Components/Header";
import Footer from "~/Components/Layouts/Footer";
import { DefaultPageProps } from "~/Components/Layouts/Layout";

type Form = { email: string; token: string; password: string; password_confirmation: string; };

export default function ResetPassword() {
  const { props: { email, token }} = usePage<DefaultPageProps & Pick<Form, "email" | "token">>();
  const { setData, post, errors, hasErrors, ...forms } = useForm<Form>();
  const [showPassword, { toggle }] = useBoolean();
  const [showPassword2, { toggle: toggle2 }] = useBoolean();

  useEffect(() => {
    /// @ts-ignore
    setData({ email, token });
  }, [email, token]);

  useEffect(() => {
    if (hasErrors) console.log({ "ResetPassword": errors, forms })
  }, [errors, hasErrors]);

  return <>
    <Center mt={24} mb={8} flexDirection="column">
      <Card maxW="calc(100% - 1rem)" width="40rem" position="relative">
        <HeaderPemilu />
        <CardBody>
          { hasErrors && (errors.password || errors.password_confirmation) && <Alert status="error" mb={4}>
            <AlertIcon />
            Terjadi kesalahan! Pastikan password dimasukan dengan benar.
          </Alert> }
          { hasErrors && !(errors.password || errors.password_confirmation) && <Alert status="error" mb={4}>
            <AlertIcon />
            Terjadi kesalahan! Email atau Token tidak sesuai dengan permintaan yang terdaftar. Pastikan Anda membuka/menyalin link yang benar.
            Lihat Console untuk inspeksi lebih lanjut.
          </Alert> }
          <form onSubmit={(e) => {e.preventDefault(); post("/auth/reset-password");}}>
            <FormControl mt={4}>
              <FormLabel>Password Baru</FormLabel>
              <InputGroup>
                <Input variant="filled" name="password" placeholder="************" type={showPassword ? "text" : "password"} onChange={e => setData("password", e.target.value)} />
                <InputRightAddon p={0}>
                  {showPassword ? <IconButton aria-label="password showed" icon={<ViewIcon />} onClick={() => toggle()} /> :
                  <IconButton color="BlackAlpha.900" colorScheme="" aria-label="password hid" icon={<ViewOffIcon />} onClick={() => toggle()} />}
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Ulangi Password</FormLabel>
              <InputGroup>
                <Input variant="filled" name="password_confirmation" placeholder="************" type={showPassword2 ? "text" : "password"} onChange={e => setData("password_confirmation", e.target.value)} />
                <InputRightAddon p={0}>
                  {showPassword2 ? <IconButton aria-label="password showed" icon={<ViewIcon />} onClick={() => toggle2()} /> :
                  <IconButton color="BlackAlpha.900" colorScheme="" aria-label="password hid" icon={<ViewOffIcon />} onClick={() => toggle2()} />}
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <Wrap mt={4} sx={{ "& > ul": { justifyContent: "space-between" } }}>
              <Button as={Link} href="/auth/login" variant="link" mr={2} leftIcon={<ChevronLeftIcon />}>Kembali ke Login</Button>
              <Button type="submit">Update Password</Button>
            </Wrap>
          </form>
          <Footer isSticky={false} m={0} w="full" mt={4} boxShadow="none" border={1} borderColor="gray.200" borderStyle="solid"
            bodyProps={{ flexDirection: ["column", "row"], alignItems: ["left", "center"] }}
          />
        </CardBody>
      </Card>
    </Center>
  </>;
}

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, HStack, Heading, IconButton, Image, Input, InputGroup, InputRightAddon, Wrap, useBoolean } from "@chakra-ui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { QrCode } from "lucide-react";
import { useState } from "react";
import HeaderPemilu from "~/Components/Header";
import Footer from "~/Components/Layouts/Footer";
import { DefaultPageProps } from "~/Components/Layouts/Layout";

type Form = { nik: string; password: string; login?: boolean; reset_password?: boolean };

export default function Login() {
  const { props: { reset_password } } = usePage<DefaultPageProps & { reset_password?: boolean }>();
  const { setData, post, errors } = useForm<Form>();
  const [showPassword, { toggle }] = useBoolean();

  console.log(errors);

  return <>
    <Center mt={24} mb={8} flexDirection="column">
      <Card maxW="calc(100% - 1rem)" position="relative">
        <HeaderPemilu />
        <CardBody>
          { reset_password && <Alert status='success' mb={4}>
            <AlertIcon />
            Reset Password berhasil! Silakan login dengan password terbaru Anda.
          </Alert> }
          {(errors as Form).login == false && <Alert status='error' mb={4}>
            <AlertIcon />
            NIK atau Kata Sandi salah. Mohon coba kembali.
          </Alert>}
          <form onSubmit={(e) => {e.preventDefault(); post("/auth/login");}}>
            <FormControl>
              <FormLabel>Nomor Induk Kependudukan</FormLabel>
              <Input variant="filled" name="nik" placeholder="8899003112230000" onChange={e => setData("nik", e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input variant="filled" name="password" placeholder="************" type={showPassword ? "text" : "password"} onChange={e => setData("password", e.target.value)} />
                <InputRightAddon p={0}>
                  {showPassword ? <IconButton aria-label="password showed" icon={<ViewIcon />} onClick={() => toggle()} /> :
                  <IconButton color="BlackAlpha.900" colorScheme="" aria-label="password hid" icon={<ViewOffIcon />} onClick={() => toggle()} />}
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <Wrap mt={4} sx={{ "& > ul": { justifyContent: "space-between" } }}>
              <Button as={Link} href="/auth/forget-password" variant="link" mr={2}>Lupa password?</Button>
              <Wrap>
                <Button type="submit">Login</Button>
                <IconButton variant="ghost" icon={<QrCode />} aria-label="Scan QR Code" />
              </Wrap>
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

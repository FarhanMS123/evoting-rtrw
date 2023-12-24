import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, HStack, Heading, IconButton, Image, Input, InputGroup, InputRightAddon, useBoolean } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import HeaderPemilu from "~/Components/Header";
import Footer from "~/Components/Layouts/Footer";

type Form = { nik: string; password: string; login?: boolean; };

export default function Login() {
  const { setData, post, errors } = useForm<Form>();
  const [showPassword, { toggle }] = useBoolean();

  return <>
    <Center mt={24} mb={8} flexDirection="column">
      <Card maxW="calc(100% - 1rem)" position="relative">
        <HeaderPemilu />
        <CardBody>
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
              {/* <Input variant="filled" name="password" placeholder="************" type="password" onChange={e => setData("password", e.target.value)} /> */}
              <InputGroup>
                <Input variant="filled" name="password" placeholder="************" type={showPassword ? "text" : "password"} onChange={e => setData("password", e.target.value)} />
                <InputRightAddon p={0}>
                  {showPassword ? <IconButton aria-label="password showed" icon={<ViewIcon />} onClick={() => toggle()} /> :
                  <IconButton color="BlackAlpha.900" colorScheme="" aria-label="password hid" icon={<ViewOffIcon />} onClick={() => toggle()} />}
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <HStack mt={4} justifyContent="end">
              <Button variant='link' mr={2}>Lupa password?</Button>
              <Button type="submit">Login</Button>
            </HStack>
          </form>
          <Footer isSticky={false} m={0} w="full" mt={4} boxShadow="none" border={1} borderColor="gray.200" borderStyle="solid" />
        </CardBody>
      </Card>
    </Center>
  </>;
}

import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, HStack, Heading, Image, Input } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import HeaderPemilu from "~/Components/Header";

type Form = { nik: string; password: string; login?: boolean; };

export default function Login() {
  const { setData, post, errors } = useForm<Form>();

  return <>
    <Center mt={24} mb={8}>
      <Card maxW="calc(100% - 1rem)">
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
              <Input variant="filled" name="password" placeholder="************" type="password" onChange={e => setData("password", e.target.value)} />
            </FormControl>
            <HStack mt={4} justifyContent="end">
              <Button type="submit">Login</Button>
            </HStack>
          </form>
        </CardBody>
      </Card>
    </Center>
  </>;
}

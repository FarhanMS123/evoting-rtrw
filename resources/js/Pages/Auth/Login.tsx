import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, HStack, Heading, Image, Input } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";

type Form = { nik: string; password: string; login?: boolean; };

export default function Login() {
  const { setData, post, errors } = useForm<Form>();

  return <>
    <Center mt={24} mb={8}>
      <Image src="/assets/logo-nm.png" boxSize={20} />
    </Center>
    <Center>
      <Card maxW="calc(100% - 1rem)">
        <CardHeader>
          <Heading size="sm">Masuk Pemilihan RT/RW</Heading>
        </CardHeader>
        <CardBody pt={0}>
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

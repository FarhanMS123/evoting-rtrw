import { AbsoluteCenter, Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, HStack, Heading, Image, Input } from "@chakra-ui/react";

export default function Login() {
  return <>
    <Center mt={24} mb={8}>
      <Image src="/assets/logo-nm.png" boxSize={20} />
    </Center>
    <Center>
      <Card>
        <CardHeader>
          <Heading size="sm">Masuk Pemilihan RT/RW</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <FormControl>
            <FormLabel>Nomor Induk Kependudukan</FormLabel>
            <Input variant="filled" placeholder="8899003112230000" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input variant="filled" placeholder="************" type="password" />
          </FormControl>
          <HStack mt={4} justifyContent="end">
            <Button>Login</Button>
          </HStack>
        </CardBody>
      </Card>
    </Center>
  </>;
}

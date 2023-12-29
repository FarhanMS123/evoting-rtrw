import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, HStack, Heading, IconButton, Image, Input, InputGroup, InputRightAddon, Text, Wrap, useBoolean } from "@chakra-ui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderPemilu from "~/Components/Header";
import Footer from "~/Components/Layouts/Footer";

type Form = { nik: string; email: string; };

export default function ForgetPassword() {
  const { setData, post, errors, wasSuccessful, hasErrors } = useForm<Form>();

  useEffect(() => {
    if (hasErrors) console.log({ "ResetPassword": errors })
  }, [errors, hasErrors]);

  return <>
    <Center mt={24} mb={8} flexDirection="column">
      <Card maxW="calc(100% - 1rem)" width="40rem" position="relative">
        <HeaderPemilu />
        <CardBody>

          { !hasErrors && !wasSuccessful && <Alert status="info" mb={4}>
            <AlertIcon />
            Masukan NIK dan Email yang telah didaftarkan pada sistem. Link perubahan password akan dikirimkan melalui email.
          </Alert> }
          { wasSuccessful && <Alert status="success" mb={4}>
            <AlertIcon />
            <Text>
              Link perubahan password sudah terkirim! Pastikan kamu juga mengecek <i>folder <b>Spam</b></i> jika tidak menemukannya di <i><b>Inbox</b></i>.
            </Text>
          </Alert> }
          { hasErrors && <Alert status="error" mb={4}>
            <AlertIcon />
            <Text>
              Link perubahan password sudah terkirim ke <i>email</i>-mu! Pastikan kamu juga mengecek <i>folder <b>Spam</b></i> jika tidak
              menemukannya di <i><b>Inbox</b></i>. Cek Console untuk inspeksi lebih lanjut.
            </Text>
          </Alert> }

          <form onSubmit={(e) => {e.preventDefault(); post("/auth/forget-password");}}>
            <FormControl mb={4}>
              <FormLabel>Nomor Induk Kependudukan</FormLabel>
              <Input variant="filled" name="nik" placeholder="8899003112230000" onChange={e => setData("nik", e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input variant="filled" name="email" placeholder="email@example.com" onChange={e => setData("email", e.target.value)} />
            </FormControl>
            <Wrap mt={4} sx={{ "& > ul": { justifyContent: "space-between" } }}>
              <Button as={Link} href="/auth/login" variant="link" mr={2} leftIcon={<ChevronLeftIcon />}>Kembali ke Login</Button>
              <Button type="submit">Reset Password</Button>
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

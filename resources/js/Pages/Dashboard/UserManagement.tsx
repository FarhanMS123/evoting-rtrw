import { ViewIcon, ViewOffIcon, EditIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { type InputProps, Card, CardBody, FormControl, FormLabel, Input, RadioGroup, Radio, HStack, InputGroup, InputRightAddon,
        IconButton, CardFooter, Button, FormHelperText, Checkbox, useToast, TableContainer, Table, Tr, Th, Thead, Tbody, Td,
        TableCaption, useBoolean, CardHeader, Heading, Text } from "@chakra-ui/react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useState, type ReactNode, useEffect, useRef } from "react";
import { DialogSkeleton, useDialog } from "~/Components/Dialog";
import DashboardLayout, { DashboardMenu } from "~/Components/Layouts/DashboardLayout";
import { type DefaultPageProps, type UserData } from "~/Components/Layouts/Layout";
import { fakerID_ID } from "@faker-js/faker";

export type UsersPageProps = {
  warga?: UserData;
  users: UserData[];
} & DefaultPageProps;

export default function UserManagement() {
  return <>
    <UserForm />
    <UserTable />
  </>;
}

UserManagement.layout = (page: ReactNode) => <DashboardLayout selectedMenu={DashboardMenu.KelolaWarga} maxW={["container.xl", "container.md"]} disableFooter>{page}</DashboardLayout>;

function UserForm () {
  const toast = useToast();
  const { props: { users, warga, show_utils } } = usePage<UsersPageProps>();

  const { setData, post, patch, errors, recentlySuccessful, wasSuccessful, processing, ...props } = useForm<
    Omit<UserData, "password"> & {
      _nik? : string;
      also_email: boolean;
      password?: string;
    }
  >();
  const [showPassword, { toggle }] = useBoolean();
  const [pass, setPass] = useState("");
  const refForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setData("password", pass);
  }, [pass]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Menambahkan Informasi Warga", {props, errors, wasSuccessful, recentlySuccessful});
      toast({
        description: "Gagal menambahkan informasi warga. Mohon isi formulir dengan benar dan coba lagi.",
        status: "error",
      });
    }
    if (wasSuccessful) {
      toast({
        description: warga ? "Pembaruan informasi warga berhasil." : "Penambahan informasi warga berhasil.",
        status: "success",
      });
      refForm.current?.reset();
    }
  }, [errors, wasSuccessful]);

  useEffect(() => {
    setData("also_email", true);
  }, []);

  function register(name?: string) {
    return {
      defaultValue: name && warga?.[name as keyof UserData],
      onChange: (e) => setData((name ?? e.target.name) as keyof UserData, e.target.value),
      isInvalid: errors[name as keyof UserData],
    } as InputProps;
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Kelola Data Warga</Heading>
      </CardHeader>
      <form ref={refForm} onSubmit={(e) => {e.preventDefault(); (warga ? patch : post)("");}}>
        <CardBody>
            <FormControl isRequired={!warga}>
              <FormLabel>Nomor Induk Kependudukan</FormLabel>
              <Input variant="filled" name="nik" placeholder="8899003112230000" {...register("nik")} />
              { errors.nik && <FormHelperText>{errors.nik}</FormHelperText> }
            </FormControl>
            <FormControl isRequired={!warga} mt={2}>
              <FormLabel>Nama Lengkap</FormLabel>
              <Input variant="filled" name="nama" {...register("nama")} />
            </FormControl>
            <FormControl isRequired={!warga} mt={2}>
              <FormLabel>Jenis Kelamin</FormLabel>
              <RadioGroup defaultValue={warga?.jenis_kelamin} onChange={(v) => setData("jenis_kelamin", v as UserData["jenis_kelamin"])}>
                <HStack gap={4}>
                  <Radio value="laki-laki">Laki-Laki</Radio>
                  <Radio value="perempuan">Perempuan</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired={!warga} mt={2}>
              <FormLabel>Alamat</FormLabel>
              <Input variant="filled" name="alamat" {...register("alamat")} />
            </FormControl>
            <FormControl isRequired={!warga} mt={2}>
              <FormLabel>Pekerjaan</FormLabel>
              <Input variant="filled" name="pekerjaan" {...register("pekerjaan")} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input variant="filled" name="email" placeholder="email@example.com" type="email" {...register("email")} />
              { errors.email && <FormHelperText>{errors.email}</FormHelperText> }
            </FormControl>
            { show_utils && <FormControl>
              <FormLabel>Telepon</FormLabel>
              <Input variant="filled" name="telepon" placeholder="+62XXXYYYYZZZZ" type="tel" {...register("telepon")} />
              { errors.telepon && <FormHelperText>{errors.telepon}</FormHelperText> }
            </FormControl> }

            { show_utils && <FormControl isRequired={!warga} mt={2}>
              <FormLabel>Password</FormLabel>
              <HStack>
                <InputGroup>
                  <Input variant="filled" name="password"
                    placeholder={showPassword ? "password" : "************"}
                    type={showPassword ? "text" : "password"}
                    {...register()}
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                  />
                  <InputRightAddon p={0}>
                    {showPassword ? <IconButton aria-label="password showed" icon={<ViewIcon />} onClick={() => toggle()} /> :
                    <IconButton color="BlackAlpha.900" colorScheme="" aria-label="password hid" icon={<ViewOffIcon />} onClick={() => toggle()} />}
                  </InputRightAddon>
                </InputGroup>
                <IconButton icon={<RepeatIcon />} aria-label="Generate" variant="ghost"
                  onClick={() => setPass(`${ fakerID_ID.word.adverb() }`)}
                />
              </HStack>
              <FormHelperText>Harap catat dan simpan password dengan aman. Informasi ini akan disimpan dalam bentuk terenkripsi dan tidak akan muncul lagi.</FormHelperText>
            </FormControl> }

            <FormControl mt={2}>
              <FormLabel>Lanjutan</FormLabel>
              { show_utils && <HStack gap={4}>
                  <Checkbox defaultChecked={warga?.is_admin} onChange={(e) => setData("is_admin", e.target.checked)}>Jadikan Admin</Checkbox>
                  <Checkbox defaultChecked={warga?.non_villager} onChange={(e) => setData("non_villager", e.target.checked)}>Bukan Warga</Checkbox>
              </HStack> }
              <Checkbox defaultChecked={true} onChange={(e) => setData("also_email", e.target.checked)}>Kirim pembaruan melalui email</Checkbox>
            </FormControl>
        </CardBody>
        <CardFooter pt={0} display="flex" justifyContent="end">
          {!warga && <>
            <Button isLoading={processing} type="submit">Tambah</Button>
          </> }
          { warga && <>
            <Button variant="ghost" type="reset" mr={2} onClick={() => router.reload({})}>Reset</Button>
            <Button isLoading={processing} type="submit">Perbarui</Button>
          </> }
        </CardFooter>
      </form>
    </Card>
  );
}

function UserTable() {
  const { props: { users, show_utils } } = usePage<UsersPageProps>();
  const { isOpen, onClose, data, setData, cancelRef } = useDialog<UserData>();

  useEffect(() => {
    const ev = router.on("success", (ev) => {
      onClose(true);
    });
    return ev;
  }, []);

  return (<>
    <Card>
      <CardBody>
        <HStack w="full">
          <Link href="/dashboard/users">
            <Button variant="ghost">Tambah Warga</Button>
          </Link>
        </HStack>
        <TableContainer>
          <Table variant='simple' colorScheme="gray">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>NIK</Th>
                <Th>Nama</Th>
                <Th>J. Kelamin</Th>
                <Th>Alamat</Th>
                <Th>Pekerjaan</Th>
                <Th>Email</Th>
                { show_utils && <Th>Telepon</Th> }
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              { users.map((user, index) => (
                <Tr>
                  <Td>{ index + 1 }</Td>
                  <Td>{ user.nik }</Td>
                  <Td>{ user.nama }</Td>
                  <Td>{ user.jenis_kelamin }</Td>
                  <Td>{ user.alamat }</Td>
                  <Td>{ user.pekerjaan }</Td>
                  <Td>{ user.email }</Td>
                  { show_utils && <Td>{ user.telepon }</Td> }
                  <Td>{ (() => {
                    let status = [];
                    if (user.is_admin) status.push("Admin");
                    if (user.non_villager) status.push("Bukan Warga");
                    else status.push("Warga");
                    return status.join(", ");
                  })() }</Td>
                  <Td>
                    <Link href={`/dashboard/users/${user.nik}`}>
                      <IconButton aria-label="Edit" icon={<EditIcon />} colorScheme="gray" />
                    </Link>
                    <IconButton aria-label="Delete" icon={<DeleteIcon />} colorScheme="gray" ml={1} onClick={() => setData(user, true)} />
                  </Td>
                </Tr>
              )) }
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
    <DialogSkeleton isOpen={isOpen} onClose={onClose}
      leastDestructiveRef={cancelRef}
      header={`Hapus "${ data?.nama }" dari Warga?`}
      footer={<>
        <Button ref={cancelRef} variant="ghost" onClick={() => onClose()}>Batalkan</Button>
        <Link href={`/dashboard/users/${data?.nik}`} method="delete">
          <Button>Hapus</Button>
        </Link>
      </>}
    >
      <Text>Warga dengan nama <b>{ data?.nama }</b> dan NIK <b>{ data?.nik }</b> akan dihapus dari daftar dan kehilangan hak pilihnya melalui aplikasi ini.</Text>
    </DialogSkeleton>
  </>);
}

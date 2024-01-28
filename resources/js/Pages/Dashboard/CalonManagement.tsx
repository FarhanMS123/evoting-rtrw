import { Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, HStack, Heading, Image, Input, type InputProps, Textarea, useBoolean, useToast, useToken, type TextareaProps, TableContainer, Table, Thead, Tr, Th, Tbody, Td, IconButton, Text, Tag } from "@chakra-ui/react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { type ReactNode, useRef, useId, useState, useMemo, useEffect } from "react";
import DashboardLayout, { DashboardMenu } from "~/Components/Layouts/DashboardLayout";
import { type DefaultPageProps, type UserData } from "~/Components/Layouts/Layout";
import { type CalonData } from "../Home";
import { DialogSkeleton, useDialog } from "~/Components/Dialog";
import { ViewIcon, ViewOffIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Markdown from "react-markdown";
import { md_components } from "~/Components/helper";

export type CalonsPageProps = {
  calon?: CalonData;
  calons: CalonData[];
  users: UserData[];
} & DefaultPageProps;

type FormCalonData = Omit<CalonData, "user">;

export default function CalonManagement() {
  return <>
    <CalonForm />
    <CalonTable />
  </>;
}

CalonManagement.layout = (page: ReactNode) => <DashboardLayout selectedMenu={DashboardMenu.KelolaCalon} maxW={["container.xl", "container.md"]} disableFooter>{page}</DashboardLayout>;

function CalonForm() {
  const toast = useToast();
  const [Gray200] = useToken("colors", ["gray.200"]);
  const { props: { calons, calon, users, show_utils } } = usePage<CalonsPageProps>();

  const { setData, post, patch, errors, recentlySuccessful, wasSuccessful, processing, ...props } = useForm<FormCalonData & {_nomor? : number}>();
  const refForm = useRef<HTMLFormElement>(null);

  const idUser = useId();
  const [nikSearch, setNikSearch] = useState("");
  const selectedUser = useMemo<UserData | null>(() => (nikSearch.length == "8899003112230000".length ? users.filter((v) => v.nik == nikSearch)[0] : null), [nikSearch]);

  useEffect(() => {
    setNikSearch(calon?.nik ?? "");
  }, [ calon ]);

  function search(val: string) {
    router.get("", { s: val }, {
      preserveState: true,
      replace: true,
    });
    setNikSearch(val);
    setData("nik", val);
  }

  function register(name?: keyof FormCalonData) {
    return {
      defaultValue: name && calon?.[name as keyof CalonData],
      onChange: (e) => setData((name ?? e.target.name) as keyof FormCalonData, e.target.value),
      isInvalid: errors[name as keyof FormCalonData],
    } as InputProps;
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Kelola Data Warga</Heading>
      </CardHeader>
      <form ref={refForm} onSubmit={(e) => {e.preventDefault(); (calon ? patch : post)("");}}>

        <CardBody>

          <FormControl isRequired>
            <FormLabel>Nomor Induk Kependudukan</FormLabel>
            <Input variant="filled" name="nik" placeholder="8899003112230000"
              list={ idUser }
              { ...register("nik") }
              onChange={(ev) => search(ev.target.value)}
            />
            <datalist id={ idUser }>
              { users.map((x) => (
                <option key={x.nik} value={ x.nik }>{`${ x.nik } - ${ x.nama }`}</option>
              )) }
            </datalist>
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Nama Calon</FormLabel>
            <Input isDisabled variant="outline" value={selectedUser?.nama ?? ""} />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Foto Calon</FormLabel>
            <HStack borderWidth="1px" borderRadius="lg" mt={2} p={2}>
              <Box borderWidth="1px" minH="8rem" w="fit-content" bgColor={Gray200}>
                <Image src="" w="8rem" />
              </Box>
              <Input type="file" pt={1} />
            </HStack>
          </FormControl>

          <FormControl isRequired mt={2}>
            <FormLabel>Nomor Urut</FormLabel>
            <Input variant="filled" name="nik" type="number" min={0} { ...register("nomor")} />
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel>Visi</FormLabel>
            <Textarea variant="filled" name="visi" { ...register("visi") as TextareaProps } />
          </FormControl>
          <FormControl isRequired mt={2}>
            <FormLabel>Misi</FormLabel>
            <Textarea variant="filled" name="misi" { ...register("misi") as TextareaProps } />
          </FormControl>

        </CardBody>

        <CardFooter pt={0} display="flex" justifyContent="end">
          {!calon && <Button isLoading={processing} type="submit">Tambah</Button> }
          { calon && <>
            <Button variant="ghost" type="reset" mr={4} onClick={() => router.reload({})}>Reset</Button>
            <Button isLoading={processing} type="submit">Perbarui</Button>
          </> }
        </CardFooter>

      </form>
    </Card>
  )
}

function CalonTable() {
  const { props: { calons } } = usePage<CalonsPageProps>();
  const { isOpen, onClose, data, setData, cancelRef } = useDialog<CalonData>();

  return (<>
    <Card>
      <CardBody>
        <HStack w="full">
          <Link href="/dashboard/calons">
            <Button variant="ghost">Tambah Calon</Button>
          </Link>
        </HStack>
        <TableContainer>
          <Table variant='simple' colorScheme="gray"
            sx={{
              tableLayout: "fixed",
              "tr > :nth-child(1)" : {
                w: "4rem",
              },
              "tr > :nth-child(4), tr > :nth-child(5)" : {
                w: "32rem",
                whiteSpace: "break-spaces",
              },
              "tr > :nth-child(2), tr > :nth-child(3)" : {
                w: "10rem",
              },
              "tr > :nth-child(6)" : {
                w: "8rem",
              },
              // "tr > :not(:nth-child(4), :nth-child(5))" : {
              //   w: "4rem",
              // },
            }}
          >
            <Thead>
              <Tr>
                <Th>Nomor</Th>
                <Th>Foto</Th>
                <Th>NIK/Nama</Th>
                <Th>Visi</Th>
                <Th>Misi</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              { calons.map(cal => (
                <Tr>
                  <Td><Tag>{ cal.nomor }</Tag></Td>
                  <Td>
                    <Image src={cal.photo} />
                  </Td>
                  <Td>
                    { cal.nik }<br />
                    { cal.user.nama }
                  </Td>
                  <Td><Markdown components={md_components}>{ cal.visi }</Markdown></Td>
                  <Td><Markdown components={md_components}>{ cal.misi }</Markdown></Td>
                  <Td>
                    <Link href={`/dashboard/calons/${cal.nomor}`}>
                      <IconButton aria-label="Edit" icon={<EditIcon />} colorScheme="gray" />
                    </Link>
                    <IconButton aria-label="Delete" icon={<DeleteIcon />} colorScheme="gray" ml={1} onClick={() => setData(cal, true)} />
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
      header={<>Hapus <Tag>{ data?.nomor }</Tag> { data?.user.nama } sebagai Calon RT?</>}
      footer={<>
        <Button ref={cancelRef} variant="ghost" onClick={() => onClose()}>Batalkan</Button>
        <Link href={`/dashboard/calons/${data?.nomor}`} method="delete">
          <Button>Hapus</Button>
        </Link>
      </>}
    >
      <Text>Calon <Tag>{ data?.nomor }</Tag> <b>{ data?.user.nama }</b> dengan NIK <b>{ data?.nik }</b> akan dihapus dari daftar dan kehilangan hak untuk dipilih melalui aplikasi ini.</Text>
    </DialogSkeleton>
  </>);
}

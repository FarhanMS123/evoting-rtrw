import { Alert, AlertIcon, Card, CardBody, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Wrap, WrapItem } from "@chakra-ui/react";
import { type ReactNode } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";

export default function Result() {
  return <>
    <Card mb={4}>
      <HeaderPemilu useBorder={false} />
    </Card>

    <Wrap w="full" justify="stretch" mb={2}>
      <WrapItem flexGrow={1} flexDirection="column" gap={2}>
        <Calon w="full" image="assets/paslon-1.jpg" nomor={1} nama="Dr. Kitty" />
        <Card w="full" mb={2}>
          <CardBody textAlign="center">
            <Heading display="inline-block">12</Heading>
            <Heading size="sm" display="inline-block" ml={1}>pemilih</Heading>
          </CardBody>
        </Card>
      </WrapItem>
      <WrapItem flexGrow={1} flexDirection="column" gap={2}>
        <Calon w="full" image="assets/paslon-2.jpg" nomor={2} nama="Mr. Teddy Bear" />
        <Card w="full" mb={2}>
          <CardBody textAlign="center">
            <Heading display="inline-block">8</Heading>
            <Heading size="sm" display="inline-block" ml={1}>pemilih</Heading>
          </CardBody>
        </Card>
      </WrapItem>
    </Wrap>

    <Card mb={4} w={["full", "fit-content"]}>
      <CardBody>
        <Table colorScheme="gray">
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Abstain</Td>
              <Td>4 pemilih</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Tidak memilih</Td>
              <Td>6 peserta</Td>
            </Tr>
          </Tbody>
        </Table>
      </CardBody>
    </Card>

    <Alert status='info' mb={4}>
      <AlertIcon />
      Hasil rekapitulasi sementara dapat dilihat dalam tabel di bawah ini.
    </Alert>

    <Card mb={4}>
      <CardBody>
        <Table colorScheme="gray">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Kode Pemilihan</Th>
              <Th>Pilihan</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td fontWeight="bold">2EF4AB</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td fontWeight="bold">AB7F21</Td>
              <Td>1</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td fontWeight="bold">C72EA0</Td>
              <Td>1</Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td fontWeight="bold">992351</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td fontWeight="bold">2DDDEF</Td>
              <Td>1</Td>
            </Tr>
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  </>;
}

Result.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

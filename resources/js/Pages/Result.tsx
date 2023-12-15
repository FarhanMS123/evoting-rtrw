import { Alert, AlertIcon, Card, CardBody, Heading, Table, TableContainer, Tag, Tbody, Td, Text, Tfoot, Th, Thead, Tr, Wrap, WrapItem } from "@chakra-ui/react";
import { type ReactNode } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";

export default function Result() {
  return <>
    {/* <Card mb={4}>
      <HeaderPemilu useBorder={false} />
    </Card> */}

    {/* <Wrap w="full" justify="stretch" mb={2}>
      <WrapItem flexGrow={1} flexDirection="column" gap={2}>
        <Calon w="full" image="assets/paslon-1.jpg" nomor={1} nama="Dr. Kitty" />
        <Card w="full" mb={2}>
          <CardBody textAlign="center">
            <Heading display="inline-block">12</Heading>
            <Heading size="sm" display="inline-block" ml={1}>suara</Heading>
          </CardBody>
        </Card>
      </WrapItem>
      <WrapItem flexGrow={1} flexDirection="column" gap={2}>
        <Calon w="full" image="assets/paslon-2.jpg" nomor={2} nama="Mr. Teddy Bear" />
        <Card w="full" mb={2}>
          <CardBody textAlign="center">
            <Heading display="inline-block">8</Heading>
            <Heading size="sm" display="inline-block" ml={1}>suara</Heading>
          </CardBody>
        </Card>
      </WrapItem>
    </Wrap> */}

    {/* <Card mb={4} w={["full", "fit-content"]}>
      <CardBody>
        <Table colorScheme="gray">
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Abstain</Td>
              <Td>4 suara</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Tidak memilih</Td>
              <Td>6 peserta</Td>
            </Tr>
          </Tbody>
        </Table>
      </CardBody>
    </Card> */}

    <Alert status='info' mb={4}>
      <AlertIcon />
      Hasil rekapitulasi dapat dilihat dalam tabel di bawah ini hingga 31/12/2023.
    </Alert>

    <Card mb={4}>
      <CardBody>
        <Table colorScheme="gray"
          sx={{
            "tbody > tr:last-child > td": {
              borderBottomWidth: "2px",
              borderBottomColor: "gray.400"
            },
          }}
        >
          <Thead>
            <Tr>
              <Th>Kode Pemilihan</Th>
              <Th>Pilihan</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight="bold">2EF4AB</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">AB7F21</Td>
              <Td>1</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">C72EA0</Td>
              <Td>1</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">992351</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">2DDDEF</Td>
              <Td>1</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Tag mr="2">1</Tag>
                <Text display="inline-block">Dr. Kitty</Text>
              </Td>
              <Td>12 suara</Td>
            </Tr>
            <Tr>
              <Td>
                <Tag mr="2">2</Tag>
                <Text display="inline-block">Mr. Teddy Bear</Text>
              </Td>
              <Td>8 suara</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Tidak Memilih</Td>
              <Td>10 peserta</Td>
            </Tr>
          </Tfoot>
        </Table>
      </CardBody>
    </Card>
  </>;
}

Result.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

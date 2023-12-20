import { Alert, AlertIcon, Card, CardBody, Heading, Table, TableContainer, Tag, Tbody, Td, Text, Tfoot, Th, Thead, Tr, Wrap, WrapItem } from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import { type ReactNode } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout, { type DefaultPageProps } from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";
import { CalonData } from "./Home";

type ResultData = {
  votes: {
    token: string;
    vote: number;
  }[];
  left: number;
  group: (CalonData & { suara: number; vote: number; })[]
};

type ResultPageProps = ResultData & DefaultPageProps;
export default function Result() {
  const { props: { votes, left, group } } = usePage<ResultPageProps>();

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
            { votes.map((vote) => (
              <Tr key={vote.token}>
                <Td fontWeight="bold" textTransform="uppercase">{ vote.token }</Td>
                <Td>{ vote.vote }</Td>
              </Tr>
            )) }
          </Tbody>
          <Tfoot>
            { group.map( suara => (
              <Tr key={suara.nomor}>
                <Td>
                  <Tag mr="2">{ suara.nomor }</Tag>
                  <Text display="inline-block">{ suara.user.nama }</Text>
                </Td>
                <Td>{ suara.suara ?? 0 } suara</Td>
              </Tr>
            )) }
            <Tr>
              <Td fontWeight="bold">Tidak Memilih</Td>
              <Td>{ left } peserta</Td>
            </Tr>
          </Tfoot>
        </Table>
      </CardBody>
    </Card>
  </>;
}

Result.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

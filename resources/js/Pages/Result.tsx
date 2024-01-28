import { Alert, AlertIcon, Button, Card, CardBody, HStack, Heading, Table, TableContainer, Tag, Tbody, Td, Text, Tfoot, Th, Thead, Tr, Wrap, WrapItem } from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/react";
import { useMemo, type ReactNode } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout, { UserData, type DefaultPageProps } from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";
import { CalonData } from "./Home";
import { Pie } from "react-chartjs-2";
import { type ChartData } from "chart.js";
import 'chart.js/auto';
import { Download } from "lucide-react";

export type ResultData = {
  calons?: CalonData[];
  votes: {
    token: string;
    vote: number;
  }[];
  left: number;
  group: (CalonData & { suara: number; vote: number; })[];
};

export type ResultPageProps = ResultData & DefaultPageProps;

const rand256 = () => Math.floor(Math.random() * 256);
const rand = (min: number, max: number) => Math.floor(min + (Math.random() * (max - min)));
export default function Result() {
  const { props: { votes, left, group } } = usePage<ResultPageProps>();
  const dataPie = useMemo(() => {
    const ret = {
      labels: ["Belum Memilih"],
      datasets: [{
        data: [left],
        backgroundColor: ["#34495e"],
      }],
    } as ChartData<"pie", number[], string>

    group.forEach(suara => {
      ret.labels!.push(suara.user.nama);
      ret.datasets[0].data.push(suara.suara ?? 0);
      (ret.datasets[0].backgroundColor as string[]).push(`hsl(${ rand(0, 360) }, ${ rand(16, 100) }%, ${ rand(16, 100) }%)`)
    });

    return ret;
  }, [votes, left, group]);
  const sortCalon = useMemo(() => group.sort((a, b) => (b.suara - a.suara)), [group]);

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
      {/* Hasil Rekapitulisan Sementara hingga jam 21.00 tanggal 15 Januari 2024 */}
      Hasil Rekapitulisasi.
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
            { false && votes.map((vote) => ( // disabled
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
              <Td>{ left } warga</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Pemenang</Td>
              <Td>
                <Tag mr="2">{ sortCalon[0].nomor }</Tag>
                <Text display="inline-block">{ sortCalon[0].user.nama }</Text>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </CardBody>
    </Card>

    <Card mb={4} height="2xs">
      <CardBody display="flex" justifyContent="center">
        <Pie data={dataPie} options={{ maintainAspectRatio: false }} />
      </CardBody>
    </Card>

    <HStack mb={4} justifyContent="end">
      <Button w="full" rightIcon={<Download />} as={Link} href="/hasil-pemilihan/print-1">Unduh Rekapitulasi Sementara</Button>
    </HStack>
  </>;
}

Result.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

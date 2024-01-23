import { Button, Card, CardBody, CardProps, FormControl, FormHelperText, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, Tag, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import { useState, type ReactNode } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout from "~/Components/Layouts/Layout";
import { type ResultPageProps } from "./Result";

const sizeCard = {
  w: "calc(100% - (var(--chakra-space-4) * 2))",
  m: 4,
} as CardProps;

export default function ResultVer1() {
  const { props: { votes, left, group, calons } } = usePage<ResultPageProps>();
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  console.log({ calons })

  return (<>
    <Card {...sizeCard} sx={{
      "@media print": {
        display: "none",
      },
    }}>
      <CardBody display="flex" alignItems="center" gap={8}>
        <FormControl display="flex" alignItems="center" w="max-content">
          <FormLabel my={0}>Show Items</FormLabel>
          <NumberInput value={pageSize} onChange={(valString, valNumber) => setPageSize(valNumber)} w="6rem">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText my={0} ml={2}>of 1000</FormHelperText>
        </FormControl>
        <FormControl display="flex" alignItems="center" w="max-content">
          <FormLabel my={0}>Page</FormLabel>
          <NumberInput value={currPage} onChange={(valString, valNumber) => setCurrPage(valNumber)} w="6rem">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText my={0} ml={2}>of 10</FormHelperText>
        </FormControl>
        <Button ml="auto" onClick={() => window.print()}>Print</Button>
      </CardBody>
    </Card>

    <Card {...sizeCard}>
      <HeaderPemilu useBorder={false} />
    </Card>
    <Card {...sizeCard}>
      <CardBody>
        <Table colorScheme="gray" sx={{
          borderWidth: 1,
          borderColor: "BlackAlpha.100",
          borderRadius: "base",

          "& td, & th": {
            borderRightWidth: 1,
            borderColor: "BlackAlpha.100"
          },
        }}>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Kode</Th>
              <Th>Pilihan</Th>
            </Tr>
          </Thead>
          <Tbody>
            { votes.map((vote, i) => (
              <Tr key={vote.token}>
                <Td>{ ((currPage - 1) * pageSize) + i + 1 }</Td>
                <Td fontWeight="bold" textTransform="uppercase">{ vote.token }</Td>
                <Td>
                  <Tag mr="2">{ vote.vote }</Tag>
                  <Text display="inline-block">{ calons?.[vote.vote - 1].user.nama }</Text>
                </Td>
              </Tr>
            )) }
          </Tbody>
        </Table>
      </CardBody>
    </Card>
    <Card {...sizeCard}>
      <CardBody>
        <Heading size="md" mb={4}>Ringkasan Perolehan Suara</Heading>
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
              <Td fontWeight="bold">Belum Memilih</Td>
              <Td>{ left } warga</Td>
            </Tr>
          </Tfoot>
        </Table>
      </CardBody>
    </Card>
  </>);
}

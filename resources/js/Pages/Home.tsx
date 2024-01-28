import { Button, Card, HStack, Stack, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { type ReactNode } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout, { type DefaultPageProps, type UserData } from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, usePage } from "@inertiajs/react";

export type CalonData = {
  nomor: number;
  nik: string;
  photo: string;
  visi: string;
  misi: string;
  user: UserData;
};

export type CalonPageProps = {
  calons: CalonData[];
} & DefaultPageProps;

export default function Home() {
  const { props: { calons, auth } } = usePage<CalonPageProps>();

  if (auth.user && Boolean(auth.user.is_admin)) return (<></>);

  return <>
    <HStack alignItems="start">
      <VStack flexGrow={1} alignItems="flex-start">
        <Card w="full">
          <HeaderPemilu useBorder={false} />
        </Card>
        <Wrap w="full" alignItems="stretch">
          { calons.map((c) => (
            <WrapItem w={{base: "full", md: "calc(50% - 0.3rem)"}} flexGrow={0} flexShrink={0} key={ c.nomor }>
              <Calon image={ c.photo } nomor={c.nomor} nama={ c.user.nama } visi={ c.visi } misi={ c.misi } w="full" flexGrow={0} h="full" />
            </WrapItem>
          )) }
        </Wrap>
        <Card w="full">
          <Link href="/pemilihan">
            <Button variant="ghost" rightIcon={<ArrowForwardIcon />} w="full">Mulai Pemilihan</Button>
          </Link>
        </Card>
      </VStack>
    </HStack>
  </>;
}

Home.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

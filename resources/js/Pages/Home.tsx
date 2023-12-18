import { Button, Card, HStack, Stack, VStack } from "@chakra-ui/react";
import { type ReactNode } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "@inertiajs/react";

export const DrKittyVisi = "Menciptakan RT/RW yang makmur dan sejahtera dengan merberdayakan tikus dan hewan-hewan kecil lainnya dalam kegiatan yang prduktif dan menghasilkan. Serta menciptakan ketentraman antar-kucing dan hewan-hewan lainnya dalam kesepakatan yang menguntungkan di kedua belah pihak.";
export const MrTeddyBearVisi = "Menciptakan RT/RW yang manis dan tentram melalui program-program yang memadukan setiap makhluk dalam keuntungan setimpal.";
export const Misi = Array(5).fill("Lorem ipsum dolor sit amet");

export default function Home() {

  return <>
    <HStack alignItems="start">
      <VStack flexGrow={1} alignItems="flex-start">
        <Card w="full">
          <HeaderPemilu useBorder={false} />
        </Card>
        <Stack direction={{ base: "column", md: "row" }} w="calc(100% - 0.6rem)" alignItems="stretch">
          <Calon maxWidth={{ base: "full", md: "50%" }} image="assets/paslon-1.jpg" nomor={1} nama="Dr. Kitty" visi={DrKittyVisi} misi={Misi} />
          <Calon maxWidth={{ base: "full", md: "50%" }} image="assets/paslon-2.jpg" nomor={2} nama="Mr. Teddy Bear" visi={MrTeddyBearVisi} misi={Misi} />
        </Stack>
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

import { Alert, AlertIcon, HStack, VStack } from "@chakra-ui/react";
import { type ReactNode } from "react";
import Layout from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";
import { JadwalCard } from "~/Components/pages/Home/JadwalCard";

const DrKittyVisi = "Menciptakan RT/RW yang makmur dan sejahtera dengan merberdayakan tikus dan hewan-hewan kecil lainnya dalam kegiatan yang prduktif dan menghasilkan. Serta menciptakan ketentraman antar-kucing dan hewan-hewan lainnya dalam kesepakatan yang menguntungkan di kedua belah pihak.";
const MrTeddyBearVisi = "Menciptakan RT/RW yang manis dan tentram melalui program-program yang memadukan setiap makhluk dalam keuntungan setimpal.";
const Misi = Array(5).fill("Lorem ipsum dolor sit amet");

export default function Home() {

  return <>
    <HStack alignItems="start">
      <VStack display={{ "base": "none", "md": "flex" }} flexShrink={0}>
        <JadwalCard />
      </VStack>
      <VStack flexGrow={1} alignItems="flex-start">
        <JadwalCard variant="mini" w="full" display={{ "md": "none" }} />
        <Alert status='info'>
          <AlertIcon />
          Bagi para peserta pemilu, diharapkan dapat mengisi data diri terlebih dahulu melalui halaman Dashboard. Pesan ini dapat
          diabaikan jika Anda sudah memenuhi data diri sebelumnya.
        </Alert>
        <HStack w="calc(100% - 0.6rem)" alignItems="stretch">
          <Calon maxWidth="50%" image="assets/paslon-1.jpg" nomor={1} nama="Dr. Kitty" visi={DrKittyVisi} misi={Misi} />
          <Calon maxWidth="50%" image="assets/paslon-2.jpg" nomor={1} nama="Mr. Teddy Bear" visi={MrTeddyBearVisi} misi={Misi} />
        </HStack>
      </VStack>
    </HStack>
  </>;
}

Home.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

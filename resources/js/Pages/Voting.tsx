import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, AlertIcon, Button, Card, CardBody, Heading, Text, Wrap, WrapItem, useBoolean, useTheme, useToast } from "@chakra-ui/react";
import { useForm, usePage } from "@inertiajs/react";
import { type ReactNode, useState, useMemo, useEffect } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";
import { CalonData, CalonPageProps } from "./Home";
import { DialogSkeleton, useDialog } from "~/Components/Dialog";

const CalonButton = ({ isActive, isDisabled, ...props }: {
  isActive?: boolean;
  isDisabled?: boolean;
} & Parameters<typeof Calon>[0]) => {
  const theme = useTheme();
  const transitionDuration: string = theme.components.Button.baseStyle.transitionDuration;
  const transitionProperty: string = theme.components.Button.baseStyle.transitionProperty;
  const scheme: string = theme.components.Button.defaultProps.colorScheme;
  const [isEnter, setEnter] = useBoolean(false);

  if (isDisabled) isActive = false;

  const props_hover = {
    bgColor: `${scheme}.50`,
  };

  const props_active = {
    bgColor: `${scheme}.200`,
    borderColor: `${scheme}.600`,
    borderWidth: 2,
  };

  return <Calon cursor="pointer" transitionDuration={transitionDuration} transitionProperty={transitionProperty}
    { ...(isActive ? props_active : {}) }
    { ...((!isActive && isEnter) ? props_hover : {}) }
    onMouseEnter={() => setEnter.on()}
    onMouseLeave={() => setEnter.off()}
    { ...props }
  />;
};

type TokenCalonPageProps = {
  token?: string,
} & CalonPageProps;

export default function Voting() {
  const { props: { calons, token } } = usePage<TokenCalonPageProps>();
  const toast = useToast();
  const { isOpen, onClose, onOpen, cancelRef } = useDialog();
  const { setData, post, errors, wasSuccessful } = useForm<{ vote: number | false | null; }>();
  const [vote, setVote] = useState<CalonData | false | null>(null);

  useEffect(() => {
    setData({
      vote: (vote as CalonData | null)?.nomor ?? (vote as false | null),
    });
  }, [vote]);

  useEffect(() => {
    if (errors) {
      console.log("Post Vote", errors);
      toast({
        status: "error",
        description: `Terjadi masalah saat memasukan suara.${ token && " Suara Anda sepertinya telah tercatat." } Lihat console untuk mengevaluasi lebih lanjut.`
      });
    }
  }, [errors]);

  const regVote = (curr: CalonData) => ({
    isActive: (vote as CalonData | null)?.nik == curr.nik,
    onClick: () => setVote(curr),
  });

  return <>
    <Card mb={4}>
      <HeaderPemilu useBorder={false} />
    </Card>

    { false && <Alert status='info' mb={4}>
      <AlertIcon />
      Pemungutan suara masih belum dimulai. Mohon menunggu hingga waktu yang telah ditentukan.
    </Alert> }

    <Alert status='info' mb={4}>
      <AlertIcon />
      Tekan foto untuk memilih, kemudian tekan "Kirim Suara"
    </Alert>

    <Wrap w="full" justify="stretch" mb={4}>
      { calons.map((calon) => (
        <WrapItem flexGrow={1} key={calon.nomor}>
          <CalonButton w="full" image={ calon.photo } nomor={ calon.nomor } nama={ calon.user.nama } isDisabled={ !!token } { ...regVote(calon) } />
        </WrapItem>
      )) }
    </Wrap>

    {/* <Card mb={4}>
      <Button variant="ghost" { ...regVote(0) }>Abstain</Button>
    </Card> */}

    <Card mt={16}>
      <Button variant="solid" isDisabled={vote == null || !!token}
        onClick={(ev) => onOpen()}
      >Kirim Suara</Button>
    </Card>

    {/* ********************************************************************************************* */}

    { token && <Card mt={16}>
      <CardBody>
        <Alert>
          <AlertIcon />
          Gunakan kode berikut untuk melacak suara Anda. Pastikan suara Anda tidak berubah.
        </Alert>
        <Heading mt={4} textAlign="center" textTransform="uppercase">{ token }</Heading>
      </CardBody>
    </Card> }

    { !token && !wasSuccessful && <DialogSkeleton isOpen={isOpen} onClose={onClose}
      leastDestructiveRef={cancelRef}
      header={`Anda memilih calon #${ (vote as CalonData | null)?.nomor }?`}
      footer={<>
        <Button ref={cancelRef} variant="ghost" onClick={onClose}>Batalkan</Button>
        <Button onClick={() => post("/pemilihan")}>Pilih</Button>
      </>}
    >
      <Text>Setelah menekan tombol "Pilih", Anda akan menyatakan pilihan Anda SAH secara hukum dan dalam penuh kesadaran.</Text>
      { vote && <Calon image={ vote.photo } nomor={ vote.nomor } nama={ vote.user.nama } mt={4}
        borderWidth="1px"
        borderColor="gray.200"
        boxShadow="none"
      /> }
    </DialogSkeleton> }

    { token && wasSuccessful && <DialogSkeleton isOpen={isOpen} onClose={onClose}
      leastDestructiveRef={cancelRef}
      header="Pilihan telah disimpan."
    >
      <Text>Anda dapat melacak suara Anda dengan menggunakan kode berikut melalui halaman "Hasil Pemilihan"</Text>
      <Heading mt={4} textAlign="center" textTransform="uppercase">{ token }</Heading>
    </DialogSkeleton> }

  </>;
}

Voting.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

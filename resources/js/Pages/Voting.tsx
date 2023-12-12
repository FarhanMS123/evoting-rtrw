import { Alert, AlertIcon, Button, Card, Wrap, WrapItem, useBoolean, useTheme } from "@chakra-ui/react";
import { type ReactNode, useState } from "react";
import HeaderPemilu from "~/Components/Header";
import Layout from "~/Components/Layouts/Layout";
import Calon from "~/Components/pages/Home/Calon";

const CalonButton = ({ isActive, ...props }: {
  isActive?: boolean;
} & Parameters<typeof Calon>[0]) => {
  const theme = useTheme();
  const transitionDuration: string = theme.components.Button.baseStyle.transitionDuration;
  const transitionProperty: string = theme.components.Button.baseStyle.transitionProperty;
  const scheme: string = theme.components.Button.defaultProps.colorScheme;
  const [isEnter, setEnter] = useBoolean(false);

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

export default function Voting() {
  const [vote, setVote] = useState<number | null>(null);

  const regVote = (id: number) => ({
    isActive: vote == id,
    onClick: () => setVote(id),
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
      <WrapItem flexGrow={1}>
        <CalonButton w="full" image="assets/paslon-1.jpg" nomor={1} nama="Dr. Kitty" { ...regVote(1) } />
      </WrapItem>
      <WrapItem flexGrow={1}>
        <CalonButton w="full" image="assets/paslon-2.jpg" nomor={2} nama="Mr. Teddy Bear" { ...regVote(2) } />
      </WrapItem>
    </Wrap>

    <Card mb={4}>
      <Button variant="ghost" { ...regVote(0) }>Abstain</Button>
    </Card>

    <Card mt={16}>
      <Button variant="solid" isDisabled>Kirim Suara</Button>
    </Card>

  </>;
}

Voting.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

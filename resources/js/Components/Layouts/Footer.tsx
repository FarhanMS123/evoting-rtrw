import { EmailIcon } from "@chakra-ui/icons";
import { Card, CardBody, type CardBodyProps, type CardProps, Icon, Link, Text } from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Whatsapp from "~assets/whatsapp.svg?react";

function Footer ({ isSticky, bodyProps, ...props }: {
  isSticky?: boolean;
  bodyProps?: CardBodyProps;
} & CardProps) {
  if (isSticky != false) isSticky = true;

  const page = usePage();
  const [isNotEnough, setNotEnough] = useState(false);

  const stickyProps = {
    position: "fixed",
    left: 0,
    bottom: 0,
  } as Partial<CardProps>;

  useEffect(() => {
    const reStick = () => {
      if (document.body.clientHeight - 30 < window.innerHeight) setNotEnough(true);
      else setNotEnough(false);
    };
    reStick();
    window.addEventListener("resize", reStick);
    return () => window.removeEventListener("resize", reStick);
  }, [isSticky, isNotEnough, page]);

  return (
    <Card m="1rem" w="calc(100% - 2rem)" { ...(isSticky && isNotEnough ? stickyProps : {})} {...props}>
      <CardBody display="flex" gap={8} justifyContent="center" alignItems="center" {...bodyProps}>
        <Text w="fit-content">Bantuan: </Text>
        <Text w="fit-content">
          <Icon as={Whatsapp} fill="#25D366" w={6} h={6} alignSelf="center" mb={"-0.5rem"} />
          <Link href="https://wa.me/+6281385928011" ml={2}>(+62) 813-8592-8011</Link>
        </Text>
        <Text w="fit-content">
          <Icon as={EmailIcon} color="#aaaaaa" w={6} h={6} alignSelf="center" />
          <Link href="mailto:cs@rt6rw3.xyz" ml={2}>cs@rt6rw3.xyz</Link>
        </Text>
      </CardBody>
    </Card>
  );
}

export default Footer;

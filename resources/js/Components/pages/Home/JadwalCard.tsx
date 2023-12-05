import { Box, Card, CardBody, Link, Text } from "@chakra-ui/react";
import Jadwal from "./Jadwal";
import { ExternalLinkIcon } from "lucide-react";

export default function JadwalCard () {
  return (
    <Card overflow="hidden">
      <CardBody>
        <Jadwal mt="-4.1rem" mb="-5rem" />
      </CardBody>
      <Box py={2} px={3} bg="white" w="100%" zIndex={1} borderTopWidth={1} borderColor="gray.200">
        <Text textAlign="center">
          <Link verticalAlign="">
            <span>Lihat alur selengkapnya</span>
            <ExternalLinkIcon size={20} style={{ display: "inline-block", position: "relative", marginBottom:"-0.19rem", marginLeft: "0.2rem", }} />
          </Link>
        </Text>
      </Box>
    </Card>
  );
}

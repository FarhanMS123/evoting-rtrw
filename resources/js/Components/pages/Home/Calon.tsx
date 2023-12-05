import { type CardProps, Avatar, Card, CardBody, Center, Heading, Text, OrderedList, ListItem } from "@chakra-ui/react";
import { type ReactNode } from "react";

export default function Calon({ image, nomor, nama, visi, misi, ...props }: {
  image: string;
  nomor: number | string;
  nama: string;
  visi: ReactNode;
  misi: ReactNode[];
} & CardProps) {
  return (
    <Card flexGrow={1} flexShrink={0} {...props}>
      <CardBody>
        <Center>
          <Avatar size="2xl" name={nama} src={image} />
        </Center>
        <Heading size="md" textAlign="center" mt={3}>{ nama }</Heading>

        <Heading size="sm" mt={6}>Visi</Heading>
        <Text mt={2}>{ visi }</Text>

        <Heading size="sm" mt={6}>Misi</Heading>
        <OrderedList mt={2}>
          { misi.map(x => <ListItem>{ x }</ListItem>) }
        </OrderedList>
      </CardBody>
    </Card>
  );
}

import { type CardProps, Avatar, Card, CardBody, Center, Heading, Text, OrderedList, ListItem, Tag, HStack } from "@chakra-ui/react";
import { type ReactNode } from "react";

export default function Calon({ image, nomor, nama, visi, misi, ...props }: {
  image: string;
  nomor: number | string;
  nama: string;
  visi?: ReactNode;
  misi?: ReactNode[];
} & CardProps) {
  return (
    <Card flexGrow={1} flexShrink={0} {...props}>
      <CardBody>
        <Center>
          <Avatar size="2xl" name={nama} src={image} />
        </Center>
        <HStack justifyContent="center" mt={3}>
          <Tag>{ nomor }</Tag>
          <Heading size="md">{ nama }</Heading>
        </HStack>

        { visi && <>
          <Heading size="sm" mt={6}>Visi</Heading>
          <Text mt={2}>{ visi }</Text>
        </> }

        { misi && <>
          <Heading size="sm" mt={6}>Misi</Heading>
          <OrderedList mt={2}>
            { misi.map((x, i) => <ListItem key={i}>{ x }</ListItem>) }
          </OrderedList>
        </> }
      </CardBody>
    </Card>
  );
}

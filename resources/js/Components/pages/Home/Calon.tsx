import { type CardProps, Avatar, Card, CardBody, Center, Heading, Text, OrderedList, ListItem, Tag, HStack } from "@chakra-ui/react";
import { type ReactNode } from "react";
import Markdown from "react-markdown";
import { md_components } from "~/Components/helper";

export default function Calon({ image, nomor, nama, visi, misi, ...props }: {
  image: string;
  nomor: number | string;
  nama: string;
  visi?: string;
  misi?: string;
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
          <Text mt={2}>
            <Markdown components={md_components}>{ visi }</Markdown>
          </Text>
        </> }

        { misi && <>
          <Heading size="sm" mt={6}>Misi</Heading>
          <Text mt={2}>
            <Markdown components={md_components}>{ misi }</Markdown>
          </Text>
        </> }
      </CardBody>
    </Card>
  );
}

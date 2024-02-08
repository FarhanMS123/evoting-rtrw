import {
  Body,
  Button,
  Container as REContainer,
  Head,
  Heading as REHeading,
  Hr,
  Html,
  Link,
  Preview,
  Text as REText,
  type HeadingProps,
  type TextProps,
  Row,
  Column,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

export const Heading = (props: HeadingProps) => <REHeading className="text-black text-[12px] font-bold text-center p-0 my-[30px] mx-0" {...props} />;
export const Text = (props: TextProps) => <REText className="text-black text-[14px] leading-[24px]" {...props} />;
export const TextMute = (props: TextProps) => <Text className="text-[#666666] text-[12px] leading-[24px]" {...props} />;

export const Wa = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export type NodeProps = {
  children?: React.ReactNode;
};

export const Header = () => (
  <REHeading className="text-black text-[12px] font-bold text-center p-0 my-[30px] mx-0">
    PEMERINTAH DAERAH KHUSUS IBUKOTA JAKARTA<br />
    KECAMATAN KEMBANGAN KELURAHAN KEMBANGAN UTARA RW 3<br />
    <br />
    PEMILIHAN KETUA RT 6
  </REHeading>
);

export function Footnote({ children }: NodeProps) {
  return (<>
    <Hr className="border border-solid border-gray-200 my-[26px] mx-0 w-full" />
    { children }
  </>)
}

export const Footer = () => (
  <REContainer className="border border-solid border-gray-200 bg-white rounded mb-[40px] mx-auto p-[20px] max-w-[465px]">
    <Row>
      <Column width="40px">
        <Img src="https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png" width="24px" height="24px" />
      </Column>
      <Column>
        <Link href="https://wa.me/+6271200001111">(+62) 712-0000-1111</Link>
      </Column>
    </Row>
    <Row>
      <Column width="40px">
        <Img src="https://lh3.googleusercontent.com/0rpHlrX8IG77awQMuUZpQ0zGWT7HRYtpncsuRnFo6V3c8Lh2hPjXnEuhDDd-OsLz1vua4ld2rlUYFAaBYk-rZCODmi2eJlwUEVsZgg" width="24px" height="24px" />
      </Column>
      <Column>
        <Link href="mailto:cs@rt6rw3.xyz">cs@rt6rw3.xyz</Link>
      </Column>
    </Row>
  </REContainer>
);

export function Container({ username, previewText, children, footnote }: {
  username: React.ReactNode;
  previewText: string;
  footnote?: React.ReactNode;
} & NodeProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-slate-100 my-auto mx-auto font-sans px-2">
          <REContainer className="border border-solid border-gray-200 bg-white rounded mt-[40px] mb-[20px] mx-auto p-[20px] max-w-[465px]">
            <Header />
            <Text>
              Halo {username},
            </Text>
            { children }
            <Text>
              Salam Hangat,<br />
              Panita Pemungutan Suara RT 6
            </Text>
            { footnote }
          </REContainer>
          <Footer />
        </Body>
      </Tailwind>
    </Html>
  );
}
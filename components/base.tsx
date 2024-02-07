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
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

export const Heading = (props: HeadingProps) => <REHeading className="text-black text-[12px] font-bold text-center p-0 my-[30px] mx-0" {...props} />;
export const Text = (props: TextProps) => <REText className="text-black text-[14px] leading-[24px]" {...props} />;
export const TextMute = (props: TextProps) => <Text className="text-[#666666] text-[12px] leading-[24px]" {...props} />;

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
    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
    { children }
  </>)
}

export const Footer = () => (
  <REContainer className="border border-solid border-[#eaeaea] rounded mb-[40px] mx-auto p-[20px] max-w-[465px]">
    Footer
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
        <Body className="bg-[#eeeeee] my-auto mx-auto font-sans px-2">
          <REContainer className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
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
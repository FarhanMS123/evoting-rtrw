import * as React from "react";
import { Container, Footnote, Text, TextMute } from "../components/base";
import { Button, Link, Section } from "@react-email/components";

export const ForgetPassword = () => {
  const previewText = `Ubah Password`;

  return (
    <Container previewText={previewText} username="User Name"
      footnote={
        <Footnote>
          <TextMute>
            Jika kamu memiliki masalah dengan tombol "Ubah Password", gunakan atau salin tautan berikut:<br />
            <Link href={`https://`} className="text-blue-600 no-underline">
              https://
            </Link>
          </TextMute>
        </Footnote>
      }
    >
      <Text className="text-black text-[14px] leading-[24px]">
        Kami menerima permintaan Ubah Password terhadap akun <b>NOMOR_NIK</b> dengan email <b>username@example.com</b>. 
        Jika kamu merasa membuat permintaan ini, kamu dapat menekan tombol "Ubah Password" di bawah ini.
      </Text>
      <Section className="text-center mt-[32px] mb-[32px]">
        <Button
          className="bg-red-500 rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
          href="https://"
        >
          Ubah Password
        </Button>
      </Section>
      <Text className="text-black text-[14px] leading-[24px]">
        Permintaan ini hanya berlaku selama 60 menit. Jika kamu merasa tidak pernah membuat permintaan ini, kamu dapat 
        mengabaikan email. Kamu juga dapat meminta bantuan panitia dengan menghubungi nomor yang tertera pada bagian 
        terakhir email ini.
      </Text>
    </Container>
  );
};

export default ForgetPassword;

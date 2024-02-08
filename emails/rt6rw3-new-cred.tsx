import * as React from "react";
import { Container, Footnote, Text, TextMute } from "../components/base";
import { Button, Column, Img, Link, Row, Section } from "@react-email/components";

export const ForgetPassword = () => {
  const borderTdTh = "border border-solid border-slate-300 px-[4px] py-[1px]";

  return (
    <Container previewText="Informasi Akun Pemilihan RT 6/RW 3" username="User Name"
      footnote={
        <Footnote>
          <Row className="my-[32px]">
            <Column align="center">
              <Img src="/static/example-qr.png" width="80px" height="80px" />
            </Column>
          </Row>
          <TextMute>
            Gunakan QR Code di atas untuk masuk dengan konfigurasi spesial, atau salin tautan di bawah ini jika mengalami kendala:<br />
            <Link href={`https://rt6rw3.xyz/auth/login?via=qr&token=uuid`} className="text-blue-600 no-underline">
              https://rt6rw3.xyz/auth/login?via=qr&token=uuid
            </Link>
          </TextMute>
        </Footnote>
      }
    >
      <Text className="text-black text-[14px] leading-[24px]">
        Kamu terdaftar sebagai pemilih di Aplikasi Pemilihan RT 6 RW 3. Berikut informasi akun dapat 
        dilihat pada tabel di bawah ini:
      </Text>
      <table className="border-collapse w-full">
        <tbody>
          <tr>
            <td className={ borderTdTh }>Nama</td>
            <td className={ borderTdTh }>User Name</td>
          </tr>
          <tr>
            <td className={ borderTdTh }>NIK</td>
            <td className={ borderTdTh }>0000000000000000</td>
          </tr>
          <tr>
            <td className={ borderTdTh }>Jenis Kelamin</td>
            <td className={ borderTdTh }>Laki-laki</td>
          </tr>
          <tr>
            <td className={ borderTdTh }>Alamat</td>
            <td className={ borderTdTh }>Jl. Yang Jauh, JanganLupa Pulang</td>
          </tr>
          <tr>
            <td className={ borderTdTh }>Pekerjaan</td>
            <td className={ borderTdTh }>Karyausaha</td>
          </tr>
          <tr>
            <td className={ borderTdTh }>Email</td>
            <td className={ borderTdTh }>email@example.com</td>
          </tr>
          <tr>
            <td className={ borderTdTh }>Password</td>
            <td className={ borderTdTh }>TestPass123!</td>
          </tr>
        </tbody>
      </table>
      <Text className="text-black text-[14px] leading-[24px]">
        Gunakan informasi akun di atas untuk masuk dan melakukan pemilihan di situs:<br />
        <Link href="https://rt6rw3.xyz">https://rt6rw3.xyz</Link>
      </Text>
    </Container>
  );
};

export default ForgetPassword;

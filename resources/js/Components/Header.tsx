import { CardHeader, CardHeaderProps, Heading, HeadingProps } from "@chakra-ui/react";

export default function HeaderPemilu({ size, useBorder, ...props }: {
  size?: HeadingProps["size"];
  useBorder?: boolean;
} & CardHeaderProps) {
  useBorder = useBorder ?? true;
  const HeadingProps = {
    size: size ?? { sm: "sm" },
    fontSize: "0.6rem",
  } as HeadingProps;

  return (
    <CardHeader textAlign="center" {...(useBorder ? { borderBottomWidth: "0.125rem", borderColor: "gray.600" } : {})} { ...props }>
      <Heading {...HeadingProps}>PEMERINTAH DAERAH KHUSUS IBUKOTA JAKARTA</Heading>
      <Heading {...HeadingProps}>KECAMATAN KEMBANGAN KELURAHAN KEMBANGAN UTARA</Heading>
      <Heading {...HeadingProps} mt={4}>PEMILIHAN KETUA RT 6 RW 3</Heading>
    </CardHeader>
  );
}

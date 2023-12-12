import { CardHeader, CardHeaderProps, Heading, HeadingProps } from "@chakra-ui/react";

export default function HeaderPemilu({ size, useBorder, ...props }: {
  size?: HeadingProps["size"];
  useBorder?: boolean;
} & CardHeaderProps) {
  size = size ?? "sm";
  useBorder = useBorder ?? true;

  return (
    <CardHeader textAlign="center" {...(useBorder ? { borderBottomWidth: "0.125rem", borderColor: "gray.600" } : {})} { ...props }>
      <Heading size={ size }>PEMILIHAN DAERAH KHUSUS IBUKOTA JAKARTA</Heading>
      <Heading size={ size }>KECAMATAN KEMBANGAN KELURAHAN KEMBANGAN UTARA</Heading>
      <Heading size={ size } mt={4}>PEMILIHAN KETUA RT 6 RW 3</Heading>
    </CardHeader>
  );
}

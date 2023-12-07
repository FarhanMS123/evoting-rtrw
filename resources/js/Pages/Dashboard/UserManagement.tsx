import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { type InputProps, Card, CardBody, FormControl, FormLabel, Input, RadioGroup, Radio, HStack, InputGroup, InputRightAddon, IconButton, CardFooter, Button, FormHelperText, Checkbox, useToast } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { useState, type ReactNode, useEffect, useRef } from "react";
import DashboardLayout, { DashboardMenu } from "~/Components/Layouts/DashboardLayout";
import { UserData } from "~/Components/Layouts/Layout";
import { JadwalCard } from "~/Components/pages/Home/JadwalCard";

export default function UserManagement() {
  const toast = useToast();

  const { setData, post, errors, recentlySuccessful, wasSuccessful, processing, ...props } = useForm<UserData>();
  const [showPassword, setShowPassword] = useState(false);
  const refForm = useRef<HTMLFormElement>(null);

  function register(name?: string) {
    return {
      onChange: (e) => setData((name ?? e.target.name) as keyof UserData, e.target.value),
      isInvalid: errors[name as keyof UserData],
    } as InputProps;
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Menambahkan Informasi Warga", {props, errors, wasSuccessful, recentlySuccessful});
      toast({
        description: "Gagal menambahkan informasi warga. Mohon isi formulir dengan benar dan coba lagi.",
        status: "error",
      });
    }
    if (wasSuccessful) {
      toast({
        description: "Penambahan informasi warga berhasil.",
        status: "success",
      });
      refForm.current?.reset();
    }
  }, [errors, wasSuccessful]);

  return (
    <Card>
      <form ref={refForm} onSubmit={(e) => {e.preventDefault(); post("");}}>
        <CardBody>
            <FormControl isRequired>
              <FormLabel>Nomor Induk Kependudukan</FormLabel>
              <Input variant="filled" name="nik" placeholder="8899003112230000" {...register("nik")} />
              { errors.nik && <FormHelperText>{errors.nik}</FormHelperText> }
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Nama Lengkap</FormLabel>
              <Input variant="filled" name="nama" {...register()} />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Jenis Kelamin</FormLabel>
              <RadioGroup onChange={(v) => setData("jenis_kelamin", v as UserData["jenis_kelamin"])}>
                <HStack gap={4}>
                  <Radio value="laki-laki">Laki-Laki</Radio>
                  <Radio value="perempuan">Perempuan</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Alamat</FormLabel>
              <Input variant="filled" name="alamat" {...register()} />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Pekerjaan</FormLabel>
              <Input variant="filled" name="pekerjaan" {...register()} />
            </FormControl>
            <FormControl>
              <FormLabel>Telepon</FormLabel>
              <Input variant="filled" name="telepon" type="tel" {...register("telepon")} />
              { errors.telepon && <FormHelperText>{errors.telepon}</FormHelperText> }
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input variant="filled" name="password" type={showPassword ? "text" : "password"} {...register()} />
                <InputRightAddon p={0}>
                  {showPassword ? <IconButton aria-label="password showed" icon={<ViewIcon />} onClick={() => setShowPassword(false)} /> :
                  <IconButton color="BlackAlpha.900" colorScheme="" aria-label="password hid" icon={<ViewOffIcon />} onClick={() => setShowPassword(true)} />}
                </InputRightAddon>
              </InputGroup>
              <FormHelperText>Harap catat dan simpan password dengan aman. Informasi ini akan disimpan dalam bentuk terenkripsi dan tidak akan muncul lagi.</FormHelperText>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Lanjutan</FormLabel>
              <HStack gap={4}>
                <Checkbox onChange={(e) => setData("is_admin", e.target.checked)}>Jadikan Admin</Checkbox>
                <Checkbox onChange={(e) => setData("non_villager", e.target.checked)}>Bukan Warga</Checkbox>
              </HStack>
            </FormControl>
        </CardBody>
        <CardFooter pt={0} display="flex" justifyContent="end">
          <Button isLoading={processing} type="submit">Tambah</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

UserManagement.layout = (page: ReactNode) => <DashboardLayout selectedMenu={DashboardMenu.KelolaWarga} maxW={["container.xl", "container.md"]}>{page}</DashboardLayout>;

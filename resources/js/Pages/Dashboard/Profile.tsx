import { Alert, AlertIcon } from "@chakra-ui/react";
import { type ReactNode } from "react";
import DashboardLayout, { DashboardMenu } from "~/Components/Layouts/DashboardLayout";
import { JadwalCard } from "~/Components/pages/Home/JadwalCard";

export default function Profile() {
  return (<>
    <Alert status='info'>
      <AlertIcon />
      Halaman ini masih belum siap.
    </Alert>
  </>);
}

Profile.layout = (page: ReactNode) => <DashboardLayout selectedMenu={DashboardMenu.Profile} maxW={["container.xl", "container.lg"]}>{page}</DashboardLayout>;

import { type ReactNode } from "react";
import DashboardLayout, { DashboardMenu } from "~/Components/Layouts/DashboardLayout";
import { JadwalCard } from "~/Components/pages/Home/JadwalCard";

export default function UserManagement() {
  return (<>
    <JadwalCard variant="mini" w="full" />
  </>);
}

UserManagement.layout = (page: ReactNode) => <DashboardLayout selectedMenu={DashboardMenu.KelolaWarga} maxW={["container.xl", "container.lg"]}>{page}</DashboardLayout>;

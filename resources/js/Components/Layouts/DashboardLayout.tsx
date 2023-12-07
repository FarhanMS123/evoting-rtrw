import { Card, CardBody, Tab, TabList, Tabs } from "@chakra-ui/react";
import Layout from "./Layout";
import { Link } from "@inertiajs/react";

export enum DashboardMenu {
  Profile = 0,
  KelolaWarga = 1,
  KelolaCalon = 2,
}

export default function DashboardLayout({ children, selectedMenu, ...props }: {
  selectedMenu: DashboardMenu;
} & Parameters<typeof Layout>[0]) {

  console.log({selectedMenu});

  return (
    <Layout {...props}>
      <Card mb={4} p={2}>
        <Tabs variant="soft-rounded" w="full" index={selectedMenu}>
          <TabList>
            <Link href="/dashboard/profile">
              <Tab>Profile</Tab>
            </Link>
            <Link href="/dashboard/users">
              <Tab>Kelola Warga</Tab>
            </Link>
            <Link href="#">
              <Tab>Kelola Calon</Tab>
            </Link>
          </TabList>
        </Tabs>
      </Card>

      { children }
    </Layout>
  );
}

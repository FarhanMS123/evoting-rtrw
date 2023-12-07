import { Card, CardBody, Tab, TabList, Tabs, VStack } from "@chakra-ui/react";
import Layout, { DefaultPageProps } from "./Layout";
import { Link, usePage } from "@inertiajs/react";

export enum DashboardMenu {
  Profile = 0,
  KelolaWarga = 1,
  KelolaCalon = 2,
  Debug = 3,
}

export default function DashboardLayout({ children, selectedMenu, ...props }: {
  selectedMenu: DashboardMenu;
} & Parameters<typeof Layout>[0]) {
  const { props: { auth, app_debug } } = usePage<DefaultPageProps>();

  return (
    <Layout {...props}>
      <VStack gap={4} alignItems="stretch">
        <Card p={2}>
          <Tabs variant="soft-rounded" w="full" index={selectedMenu}>
            <TabList>
              <Link href="/dashboard/profile">
                <Tab>Profile</Tab>
              </Link>
              { Boolean(auth.user?.is_admin) && <>
                <Link href="/dashboard/users">
                  <Tab>Kelola Warga</Tab>
                </Link>
                <Link href="#">
                  <Tab>Kelola Calon</Tab>
                </Link>
              </> }
              { (auth.user?.is_admin || app_debug) &&
                <Link href="/dashboard/debug">
                  <Tab>Debug</Tab>
                </Link>
              }
            </TabList>
          </Tabs>
        </Card>
        { children }
      </VStack>
    </Layout>
  );
}

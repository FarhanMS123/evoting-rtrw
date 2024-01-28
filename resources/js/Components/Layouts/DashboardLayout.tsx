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
  const { props: { auth, app_debug, show_utils } } = usePage<DefaultPageProps>();

  return (
    <Layout {...props}>
      <VStack gap={4} alignItems="stretch">
        <Card p={2} overflow="auto">
          <Tabs variant="soft-rounded" index={selectedMenu}>
            <TabList>
              <Link href="/dashboard/profile" style={{ display: (!auth.user?.is_admin || show_utils) ? "block" : "none",  }}>
                <Tab whiteSpace="nowrap">Profile</Tab>
              </Link>
              { Boolean(auth.user?.is_admin) && <>
                <Link href="/dashboard/users">
                  <Tab whiteSpace="nowrap">Kelola Warga</Tab>
                </Link>
                <Link href="/dashboard/calons">
                  <Tab whiteSpace="nowrap">Kelola Calon</Tab>
                </Link>
              </> }
              { (auth.user?.is_admin || app_debug) && show_utils &&
                <Link href="/dashboard/debug">
                  <Tab whiteSpace="nowrap">Debug</Tab>
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

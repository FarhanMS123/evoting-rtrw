import { type ReactNode } from "react";
import Layout from "~/Components/Layouts/Layout";

export default function Result() {
  return (
    <></>
  );
}

Result.layout = (page: ReactNode) => <Layout maxW={["container.xl", "container.lg"]}>{page}</Layout>;

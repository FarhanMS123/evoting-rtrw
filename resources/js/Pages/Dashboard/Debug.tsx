import { Alert, AlertIcon, Button, Card, CardBody, HStack, Input, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { ReactNode, useEffect } from "react";
import DashboardLayout, { DashboardMenu } from "~/Components/Layouts/DashboardLayout";
import { type UserData } from "~/Components/Layouts/Layout";

export default function Debug() {
  const toast = useToast();

  const { setData, post, errors, recentlySuccessful, wasSuccessful, processing, data, ...props } = useForm<{ cmd: string; }>();

  console.log({ errors, recentlySuccessful, wasSuccessful, processing, data, ...props });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Debug", errors);
      toast({
        description: "Command Call Error",
        status: "error",
      });
    } else if ( wasSuccessful ) {
      toast({
        title: "Command called was successful",
        description: JSON.stringify(data, null, 2),
        status: "success",
      })
    }
  }, [errors, recentlySuccessful, wasSuccessful, processing]);

  return (<>
    <Card>

      <CardBody>
        <Alert status='warning' mb={4}>
          <AlertIcon />
          This is for development purpose. Please stay away from this panel whenever you do not know what you are doing.
        </Alert>

        <HStack mb={8}>
          <Input variant="filled" name="cmd" placeholder="input command" onChange={(e) => setData("cmd", e.target.value)} />
          <Button variant='ghost' onClick={() => post("/dashboard/debug")}>Call</Button>
        </HStack>

        <HStack gap={4}>
          <Button variant='outline'>Migrate</Button>
          <Button variant='outline'>Seed</Button>
        </HStack>

      </CardBody>
    </Card>
  </>);
}

Debug.layout = (page: ReactNode) => <DashboardLayout selectedMenu={DashboardMenu.Debug} maxW={["container.xl", "container.lg"]}>{page}</DashboardLayout>;

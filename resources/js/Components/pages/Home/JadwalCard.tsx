import { type StepperProps, type CardProps, Box, Card, CardBody, Link, Text, useSteps, Stepper, Step, StepIndicator, StepStatus, StepTitle, StepDescription, StepSeparator, VStack, Avatar, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { ExternalLinkIcon } from "lucide-react";
import { useMemo } from "react";

const empty_step = { title: <>&nbsp;</>, time: <>&nbsp;</>, date: ["", ""] };
const data_steps = [
  { title: "Sebuah Judul", time: "14:00-19:00", date: ["XX", "NNN"] },
  { title: "Sebuah Judul", time: "14:00-19:00", date: ["24", "Nov"] },
  { title: "Sebuah Judul", time: "14:00-19:00", date: ["01", "Des"] },
  { title: "Sebuah Judul", time: "14:00-19:00", date: ["07", "Jan"] },
  { title: "Sebuah Judul", time: "14:00-19:00", date: ["XX", "NNN"] },
];

export const IndicatorText = ({ date, month }: {
  date: string | number;
  month: string | number;
}) => (
  <VStack gap={0}>
    <Text fontSize='md' as="b">{ date }</Text>
    <Text fontSize='xs' mt={-2}>{ month }</Text>
  </VStack>
);

export function Jadwal({ sx, variant, ...props }: {
  variant? : "full" | "mini";
} & Omit<StepperProps, "children" | "index">) {
  const index = useMemo(() => 2, []);
  const steps = useMemo(() => [empty_step, ...(variant == "mini" ? [data_steps[index]] : data_steps), empty_step], [ variant ]);
  const u_index = useMemo(() => (variant == "mini" ? 1 : index + 1), [variant, index]);
  const { activeStep } = useSteps({
    index: u_index,
    count: steps.length,
  });

  return (
    <Stepper index={activeStep} orientation='vertical' size='lg' {...props} sx={{
      "div[role='separator']": {
        maxHeight: "calc(100% - var(--stepper-indicator-size) - 8px + 1rem)",
      },
      ...sx,
    }}>
      { steps.map((step, index) => (
        <Step key={index}>

          <StepIndicator>
            <StepStatus
              complete={<IndicatorText date={step.date[0]} month={step.date[1]} />}
              incomplete={<IndicatorText date={step.date[0]} month={step.date[1]} />}
              active={<IndicatorText date={step.date[0]} month={step.date[1]} />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{ step.title }</StepTitle>
            <StepDescription>{ step.time }</StepDescription>
          </Box>

          <StepSeparator  />

        </Step>
      )) }
    </Stepper>
  );
}

export function JadwalMiniCard({ sx, ...props }: Omit<StepperProps, "children" | "index">) {
  const { activeStep } = useSteps({
    index: 3,
    count: data_steps.length,
  });

  return (
    <Card>
      <CardBody display="flex" flexDirection="row" gap={2}>
        <Avatar bg="red.500" icon={<IndicatorText date={data_steps[activeStep].date[0]} month={data_steps[activeStep].date[1]} />} />
        <Stat>
          <StatLabel>{data_steps[activeStep].title}</StatLabel>
          <StatHelpText>{data_steps[activeStep].time}</StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );

}

export function JadwalCard ({ children, variant, ...props }: CardProps & Pick<Parameters<typeof Jadwal>[0], "variant">) {
  return (
    <Card overflow="hidden" position="relative" {...props}>
      <CardBody>
        <Jadwal variant={variant} mt="-4.1rem" mb="-5rem" />
      </CardBody>
      <Box py={2} px={3} bg="white" w="100%" position="relative" zIndex={1} borderTopWidth={1} borderColor="gray.200">
        <Text textAlign="center">
          <Link verticalAlign="">
            <span>Lihat alur selengkapnya</span>
            <ExternalLinkIcon size={20} style={{ display: "inline-block", position: "relative", marginBottom:"-0.19rem", marginLeft: "0.2rem", }} />
          </Link>
        </Text>
      </Box>
    </Card>
  );
}

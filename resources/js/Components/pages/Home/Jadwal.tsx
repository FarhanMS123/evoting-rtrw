import { Box, Step, StepDescription, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, StepperProps, Text, VStack, useSteps } from "@chakra-ui/react";

const IndicatorText = ({ date, month }: {
  date: string | number;
  month: string | number;
}) => (
  <VStack gap={0}>
    <Text fontSize='md' as="b">{ date }</Text>
    <Text fontSize='xs' mt={-2}>{ month }</Text>
  </VStack>
);

export default function Jadwal({ sx, ...props }: Omit<StepperProps, "children" | "index">) {
  const steps = [
    { title: <>&nbsp;</>, time: <>&nbsp;</>, date: ["", ""] },
    { title: "Sebuah Judul", time: "14:00-19:00", date: ["XX", "NNN"] },
    { title: "Sebuah Judul", time: "14:00-19:00", date: ["24", "Nov"] },
    { title: "Sebuah Judul", time: "14:00-19:00", date: ["01", "Des"] },
    { title: "Sebuah Judul", time: "14:00-19:00", date: ["07", "Jan"] },
    { title: "Sebuah Judul", time: "14:00-19:00", date: ["XX", "NNN"] },
    { title: <>&nbsp;</>, time: <>&nbsp;</>, date: ["", ""] },
  ];
  const { activeStep } = useSteps({
    index: 3,
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

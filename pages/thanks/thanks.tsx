import { Center, Paper, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function AfterSubmit() {
  const isMobile = useMediaQuery("(min-width: 600px)");

  return isMobile ? (
    <Center>
      <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl" w="50%">
        <Title align="center">Your time has been sent to our database!</Title>
      </Paper>
    </Center>
  ) : (
    <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
      <h1>Oi</h1>
    </Paper>
  );
}

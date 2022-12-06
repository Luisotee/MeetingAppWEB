import { Center, Paper, Title } from "@mantine/core";

export default function AfterSubmit() {
  return (
    <Center>
      <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl" w="50%">
        <Title align="center">Your time has been sent to our database!</Title>
      </Paper>
    </Center>
  );
}

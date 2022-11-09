import { Group, Text, ThemeIcon, Title } from "@mantine/core";
import { FaClock } from "react-icons/fa";

export function LeftSide() {
  return (
    <>
      <Title order={5} color="dimmed" italic>
        John Doe
      </Title>
      <Title order={2}>1 Hour Meeting</Title>
      <Group>
        <ThemeIcon size="md" variant="default" radius="lg">
          <FaClock size={100} />
        </ThemeIcon>
        <Text color="gray">1 hr</Text>
      </Group>
    </>
  );
}

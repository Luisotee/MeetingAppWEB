import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  SimpleGrid,
  Paper,
  Stack,
} from "@mantine/core";
import { LeftSide } from "./left-side/left-side";
import { RightSide } from "./right-side/right-side";

export function MainCard() {
  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
      <SimpleGrid cols={2} p="lg">
        <Stack>
          <LeftSide />
        </Stack>
        <Stack>
          <RightSide />
        </Stack>
      </SimpleGrid>
    </Paper>
  );
}

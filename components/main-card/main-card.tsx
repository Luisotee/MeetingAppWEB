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
import { useMediaQuery } from "@mantine/hooks";
import { LeftSide } from "./left-side/left-side";
import { RightSide } from "./right-side/right-side";

export function MainCard({ handleSubmit }: any) {
  const isMobile = useMediaQuery("(min-width: 600px)");

  return isMobile ? (
    <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
      <SimpleGrid cols={2} p="lg">
        <Stack>
          <LeftSide />
        </Stack>
        <Stack>
          <RightSide handleSubmit={handleSubmit} />
        </Stack>
      </SimpleGrid>
    </Paper>
  ) : (
    <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
      <Stack>
        <Stack>
          <LeftSide />
        </Stack>
        <Stack>
          <RightSide handleSubmit={handleSubmit} />
        </Stack>
      </Stack>
    </Paper>
  );
}

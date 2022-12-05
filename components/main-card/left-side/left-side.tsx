import { Group, Text, ThemeIcon, Title } from "@mantine/core";
import moment from "moment";
import { FaClock } from "react-icons/fa";

export function LeftSide({ meeting }: any) {
  console.log(meeting);
  return (
    <>
      <Title order={2}>{meeting.meetingName}</Title>
      <Title order={5} color="dimmed" italic>
        {" "}
        {meeting.meetingDescription}{" "}
      </Title>

      <Group>
        <ThemeIcon size="md" variant="default" radius="lg">
          <FaClock size={100} />
        </ThemeIcon>
        <Text color="gray">{meeting.meetingDuration}</Text>
      </Group>
    </>
  );
}

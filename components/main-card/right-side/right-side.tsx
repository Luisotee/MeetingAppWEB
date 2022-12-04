import { Button, SimpleGrid, Title } from "@mantine/core";
import {
  Calendar,
  RangeCalendar,
  TimeInput,
  TimeRangeInput,
} from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

export function RightSide({ meeting }: any) {
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  const now = new Date();
  const then = dayjs(now).add(30, "minutes").toDate();
  const [value, setValue] = useState<[Date, Date]>([now, then]);

  return (
    <>
      <Title order={3}>Select a date and time</Title>
      <SimpleGrid cols={2}>
        <Button>{meeting.time1}</Button>
        <Button>{meeting.time2}</Button>
      </SimpleGrid>
      <TimeInput
        label="Or if the suggested times don't suit you, suggest your own time:"
        format="24"
        defaultValue={new Date()}
      />
      <Button>Submit</Button>
    </>
  );
}

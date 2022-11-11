import { Title } from "@mantine/core";
import { Calendar, RangeCalendar, TimeRangeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

export function RightSide() {
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
      <RangeCalendar
        value={dates}
        onChange={setDates}
        firstDayOfWeek="sunday"
        mt="md"
      />
      <TimeRangeInput
        label="Appointment time"
        value={value}
        onChange={setValue}
        clearable
      />
    </>
  );
}

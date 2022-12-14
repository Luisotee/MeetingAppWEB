import { Button, SimpleGrid, Text, Title } from "@mantine/core";
import {
  Calendar,
  RangeCalendar,
  TimeInput,
  TimeRangeInput,
} from "@mantine/dates";
import dayjs from "dayjs";
import moment from "moment";
import { useRouter } from "next/router.js";
import { useState } from "react";
import { insertTime } from "../../dbHandler/insert-data.jsx";

export function RightSide({ meeting }: any) {
  const [inputSelected, setInputSelected] = useState(new Date());
  const [selected, setSelected] = useState("");

  const router = useRouter();

  function handleInput() {
    var a = moment(inputSelected).format("HH:mm");

    setSelected(a);
  }

  return (
    <>
      <Title order={3}>Select a date and time</Title>
      <SimpleGrid cols={2}>
        <Button onClick={() => setSelected(meeting.time1)}>
          {meeting.time1}
        </Button>
        <Button onClick={() => setSelected(meeting.time2)}>
          {meeting.time2}
        </Button>
      </SimpleGrid>
      <Text align="center">Or Suggest your time:</Text>
      <SimpleGrid cols={2}>
        <TimeInput
          label=""
          format="24"
          defaultValue={new Date()}
          onChange={setInputSelected}
        />
        <Button onClick={handleInput}>Set suggestion</Button>
      </SimpleGrid>
      <Text>Selected time: {selected}</Text>
      <Button
        onClick={() => {
          insertTime(selected, { meeting });
          router.push(`/thanks/thanks`);
        }}
      >
        Submit
      </Button>
    </>
  );
}

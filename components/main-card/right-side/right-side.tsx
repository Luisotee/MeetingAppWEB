import { Button, SimpleGrid, Text, Title } from "@mantine/core";
import {
  Calendar,
  RangeCalendar,
  TimeInput,
  TimeRangeInput,
} from "@mantine/dates";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
import { insertTime } from "../../dbHandler/insert-data.jsx";

export function RightSide({ meeting }: any) {
  const [inputSelected, setInputSelected] = useState(new Date());
  const [selected, setSelected] = useState("");
  //setSelected(moment(inputSelected).format("HH:mm"));

  function handleInput() {
    //console.log(inputSelected);
    var a = moment(inputSelected).format("HH:mm");
    //console.log(a);
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
        <Button onClick={handleInput}>Send suggestion</Button>
      </SimpleGrid>
      <Text>Selected time: {selected}</Text>
      <Button onClick={() => insertTime(selected, { meeting })}>Submit</Button>
    </>
  );
}

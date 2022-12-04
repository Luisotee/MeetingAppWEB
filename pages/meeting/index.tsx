import { IMeeting } from "../../interfaces/IMeeting";
import { supabase } from "../../supabase";

type Props = {
  meetings: IMeeting[];
};

const Meetings = ({ meetings }: Props) => {
  return meetings.map((meeting) => (
    <div key={meeting.id}>{meeting.meetingName}</div>
  ));
};

export const getStaticProps = async () => {
  const { data: meetings } = await supabase.from("meetings").select("*");

  return {
    props: {
      meetings,
    },
  };
};

export default Meetings;

import { Container } from "@mantine/core";
import { GetServerSideProps } from "next/types";
import { MainCard } from "../../components/main-card/main-card";
import { IMeeting } from "../../interfaces/IMeeting";
import { supabase } from "../../supabase";

type Props = {
  meeting: IMeeting;
};

const IdMeeting = ({ meeting }: Props) => (
  <Container>
    <MainCard meeting={meeting} />
  </Container>
);

export default IdMeeting;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data: meeting } = await supabase
      .from("meetings")
      .select("*")
      .eq("id", query.id);

    //console.log("meeting: ", meeting);

    if (!meeting) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        meeting: meeting?.at(0),
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

/*id: 10,
created_at: '2022-11-28T23:19:07.443426+00:00',
meetingName: 'Party ',
meetingDescription: 'End of year party',
meetingDuration: '1',
meetingParticipants: 'All',
dataISO: '2022-11-29',
time1: '20:00:00',
time2: '22:00:00',
isRemovable: false,
userId: '7b62e2aa-a46e-46a7-a208-0a2c36700be9',
limitData: '2022-11-28',
limitHour: '16:00:00',
choosenTimes: null,
bestTime: null,
emailAlreadySent: false*/

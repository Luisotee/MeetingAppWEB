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

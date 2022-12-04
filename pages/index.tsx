import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { Container, Title } from "@mantine/core";

import { supabase } from "../supabase";
import styles from "../styles/Home.module.css";
import { MainCard } from "../components/main-card/main-card";

export default function Home({ meetings }: any) {
  const date = new Date();
  const dateNow = moment(date).format("YYYY-MM-DD");

  const emailContent = {
    email: [],
    subject: "Oii",
    message: "tchau",
    name: "eumesmo",
  };

  function handleSubmit() {
    meetings.map((meeting: any) => {
      if (meeting.limitData == dateNow) {
        let emails = [];
        emails = meeting.meetingParticipants.split(";");
        for (let i = 0; i < emails.length; i++) {
          emailContent.email = emails[i];
          sendMail(emailContent);
        }
      }
    });
  }

  return <div>Server</div>;
}

export const getStaticProps = async () => {
  const { data: meetings } = await supabase.from("meetings").select("*");

  return {
    props: {
      meetings,
    },
  };
};

const sendMail = async (data: any) => {
  try {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    //if sucess do whatever you like, i.e toast notification
  } catch (error) {
    return error;

    // toast error message. whatever you wish
  }
};

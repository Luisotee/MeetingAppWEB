import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { Container, Title } from "@mantine/core";

import { supabase } from "../supabase";
import styles from "../styles/Home.module.css";
import { MainCard } from "../components/main-card/main-card";
import { resolve } from "node:path/win32";
import { count } from "node:console";
import {
  insertData,
  insertEmailSent,
} from "../components/dbHandler/insert-data.jsx";
import { removeMeeting } from "../components/dbHandler/delete-data";

export default function Home({ meetings }: any) {
  const date = new Date();
  const dateNow = moment(date).format("YYYY-MM-DD");

  const emailContent = {
    email: [],
    subject: "Register Time",
    message: "Schedule your meeting",
    name: "SchedulerApp",
  };

  const emailDone = {
    email: [],
    subject: "Your meeting has been scheduled",
    message: "",
    name: "SchedulerApp",
  };

  function handleSubmit() {
    meetings.map((meeting: any) => {
      //console.log(meeting);
      console.log("DATA hoj", dateNow);

      if (meeting.emailAlreadySent == false) {
        let emails = [];
        emails = meeting.meetingParticipants.split(";");

        emails.map((email: any) => {
          //console.log(email);
          emailContent.email = email;
          emailContent.message = "http://localhost:3000/meeting/" + meeting.id;
          sendMail(emailContent);
          insertEmailSent({ meeting });
        });
      }

      if (
        meeting.limitData < dateNow &&
        meeting.bestTime == null &&
        meeting.choosenTimes != null
      ) {
        //console.log("ENTROEUUUUUUUUU");
        let emails = [];
        emails = meeting.meetingParticipants.split(";");
        //console.log(emails);

        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let definetiveTime = "";

        meeting.choosenTimes.map((time: any) => {
          if (time == meeting.time1) {
            count1++;
          } else if (time == meeting.time2) {
            count2++;
          } else {
            count3++;
          }
        });
        console.log("count 1: ", count1);
        console.log("count 2: ", count2);
        console.log("count 3: ", count3);

        if (count1 > count2 && count1 > count3) {
          console.log("1");
          definetiveTime = meeting.time1;
        } else if (count2 > count1 && count2 > count3) {
          console.log("2");
          definetiveTime = meeting.time2;
        } else {
          console.log("3");
          definetiveTime =
            "Suggested time count higher, please redo your meeting.";
        }
        console.log(definetiveTime);
        emailDone.message = definetiveTime;
        emails.map((email: any) => {
          //console.log(email);
          emailDone.email = email;
          sendMail(emailDone);
        });
        insertData(definetiveTime, { meeting });
      }
      if (meeting.dataISO < dateNow) {
        removeMeeting({ meeting });
      }
    });
  }

  handleSubmit();

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

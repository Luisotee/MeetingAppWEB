import moment from "moment";

import { useRouter } from "next/router";
import { removeMeeting } from "../components/dbHandler/delete-data";
import { fetchMeetings } from "../components/dbHandler/fetch-data";
import {
  insertData,
  insertEmailSent,
} from "../components/dbHandler/insert-data.jsx";

export default function Home() {
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

  async function handleSubmit() {
    const meetings = await fetchMeetings();
    if (meetings) {
      meetings.map((meeting: any) => {
        if (meeting.emailAlreadySent == false) {
          let emails = [];
          emails = meeting.meetingParticipants.split(";");

          emails.map(async (email: any) => {
            console.log(email);
            emailContent.email = email;
            emailContent.message =
              "You have been invited to a meeting! You can vote for your time here: https://meeting-app-web.vercel.app/meeting/" +
              meeting.id;
            await sendMail(emailContent);
            insertEmailSent({ meeting });
          });
        }

        if (
          meeting.limitData == dateNow &&
          meeting.bestTime == null &&
          meeting.choosenTimes != null
        ) {
          let emails = [];
          emails = meeting.meetingParticipants.split(";");

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
          emails.map(async (email: any) => {
            emailDone.email = email;
            await sendMail(emailDone);
          });
          insertData(definetiveTime, { meeting });
        }
        if (meeting.dataISO < dateNow) {
          removeMeeting({ meeting });
        }
      });
    }
  }

  const router = useRouter();

  const interval = setInterval(handleSubmit, 10000);

  return <div>Server</div>;
}

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

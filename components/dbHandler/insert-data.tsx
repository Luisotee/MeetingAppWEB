import { supabase } from "../../supabase";

export async function insertTime(props: any, { meeting }: any) {
  //console.log(meeting);
  let ar = meeting.choosenTimes;
  ar.push(props);
  const { error } = await supabase
    .from("meetings")
    .update({
      choosenTimes: [ar],
    })
    .eq("id", meeting.id)
    .select();

  console.log(error);
}

export async function insertData(props: any, { meeting }: any) {
  //console.log(meeting);
  const { error } = await supabase
    .from("meetings")
    .update({
      bestTime: props,
    })
    .eq("id", meeting.id)
    .select();

  console.log(error);
}

export async function insertEmailSent({ meeting }: any) {
  //console.log(meeting);
  const { error } = await supabase
    .from("meetings")
    .update({
      emailAlreadySent: true,
    })
    .eq("id", meeting.id)
    .select();

  console.log(error);
}

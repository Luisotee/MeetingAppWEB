import { supabase } from "../../supabase";

export async function insertTime(props, { meeting }) {
  let ar = [];
  if (meeting.choosenTimes == null) {
    ar = [props];
  } else {
    ar = meeting.choosenTimes;
    ar.push(props);
  }
  console.log(ar);
  const { error } = await supabase
    .from("meetings")
    .update({
      choosenTimes: ar,
    })
    .eq("id", meeting.id)
    .select();

  console.log(error);
}

export async function insertData(props, { meeting }) {
  const { error } = await supabase
    .from("meetings")
    .update({
      bestTime: props,
    })
    .eq("id", meeting.id)
    .select();

  console.log(error);
}

export async function insertEmailSent({ meeting }) {
  const { error } = await supabase
    .from("meetings")
    .update({
      emailAlreadySent: true,
    })
    .eq("id", meeting.id)
    .select();

  console.log(error);
}

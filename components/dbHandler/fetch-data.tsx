import { supabase } from "../../supabase";

export async function fetchMeetings() {
  const { data, error } = await supabase.from("meetings").select("*");

  if (error) console.log("error: ", error);

  return data;
}

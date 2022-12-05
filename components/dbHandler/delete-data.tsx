import { supabase } from "../../supabase";

export async function removeMeeting({ meeting }: any) {
  const { error } = await supabase
    .from("meetings")
    .delete()
    .eq("id", meeting.id);

  console.log(error);
}

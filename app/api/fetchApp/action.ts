import { supabase } from "@/utils/supabase/client";

async function fetchApps() {
    const { data, error } = await supabase
      .from("apps")
      .select("id, created_at, name, dir");
  
    if (error) {
      console.error("Error fetching apps:", error);
      return null;
    }
  
    console.log("Apps data:", data);
    return data;
  }
  
  fetchApps();
  
import { supabase } from "@/lib/supabase";
import RegistrationsChart from "@/components/RegistrationChart";
import { useState } from "react";

const Analytics = () => {
  const [data, setData] = useState<any>([]);
  async function fetchAnalytics() {
    const { data } = await supabase.rpc("registrations_by_month");

    setData(data);
  }
  fetchAnalytics();
  return (
    <div>
      <RegistrationsChart data={data} />
    </div>
  );
};

export default Analytics;

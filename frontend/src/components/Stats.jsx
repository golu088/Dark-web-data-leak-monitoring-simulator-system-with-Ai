import React, { useEffect, useState } from "react";
import { getStats } from "../api";

function Stats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getStats().then(res => setData(res));
  }, []);

  return (
    <div>
      <h2>Stats</h2>

      {data && (
        <div>
          <p>Total Records: {data.total_records}</p>
          <p>Unique Emails: {data.unique_emails}</p>
        </div>
      )}
    </div>
  );
}

export default Stats;
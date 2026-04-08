import React, { useEffect, useState } from "react";
import { getMonitor } from "../services/api";

export default function Monitor() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getMonitor();
    setData(res.data);
  };

  return (
    <div>
      <h2>System Monitor</h2>

      {data && (
        <>
          <p>CPU Usage: {data.data.cpu}%</p>
          <p>Status: {data.status}</p>

          {data.analysis && (
            <div>
              <h3>AI Analysis:</h3>
              <pre>{data.analysis}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
import React, { useState } from "react";
import { scanURL } from "../services/api";

export default function Scanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const handleScan = async () => {
    const res = await scanURL(url);
    setResult(res.data.analysis);
  };

  return (
    <div>
      <h2>URL Scanner</h2>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={handleScan}>Scan</button>

      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
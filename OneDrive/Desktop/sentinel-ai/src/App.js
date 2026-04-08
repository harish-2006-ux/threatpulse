import React from "react";
import Dashboard from "./components/Dashboard";
import Monitor from "./components/Moniter";
import Scanner from "./components/Scanner";
import Logs from "./components/Logs";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sentinel AI</h1>

      <Dashboard />
      <hr />

      <Monitor />
      <hr />

      <Scanner />
      <hr />

      <Logs />
    </div>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import CricketTable from "./Table";

const host = import.meta.env.VITE_BACKEND_API_HOST;
const port = import.meta.env.VITE_BACKEND_API_PORT;
const baseURL = `http://${host}:${port}`;

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${baseURL}/api/hello`)
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{msg || "Loading..."}</h1>
      <CricketTable />
    </div>
  );
}

export default App;


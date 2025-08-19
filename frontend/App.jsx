import React, { useEffect, useState } from "react";


function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://13.232.206.44:8000/api/hello")
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{msg || "Loading..."}</h1>
    </div>
  );
}

export default App;


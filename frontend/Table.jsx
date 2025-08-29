import React, { useEffect, useState } from "react";

function CricketTable() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = import.meta.env.VITE_BACKEND_API_HOST;
        const port = import.meta.env.VITE_BACKEND_API_PORT;
        const apiUrl = `http://${host}:${port}/api/cricket-table`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPlayers(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading player data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <h2>Error loading data</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Statistics
      </h2>
      
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#2c5282", color: "white" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Player Name
              </th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>
                Matches
              </th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>
                Runs
              </th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>
                Wickets
              </th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>
                Average
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr 
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e3f2fd";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f8f9fa" : "white";
                }}
              >
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>
                  {player.name}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                  {player.matches}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd", textAlign: "center", color: "#2d3748" }}>
                  {player.runs}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd", textAlign: "center", color: "#e53e3e" }}>
                  {player.wickets}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd", textAlign: "center", color: "#38a169" }}>
                  {player.matches > 0 ? (player.runs / player.matches).toFixed(1) : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {players.length === 0 && !loading && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          <p>No player data available</p>
        </div>
      )}
    </div>
  );
}

export default CricketTable;
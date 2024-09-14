import React, { useState, useEffect } from "react";

const App = () => {
  const [frontendIp, setFrontendIp] = useState(null);
  const [backendResponse, setBackendResponse] = useState(null);

  useEffect(() => {
    // Fetch the public IP of the frontend
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setFrontendIp(data.ip);
        // Send the IP to the backend
        sendIpToBackend(data.ip);
      })
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  const sendIpToBackend = (ip) => {
    fetch("http://localhost:5000/api/submit-ip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip: ip }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendResponse(data);
      })
      .catch((error) => console.error("Error sending IP to backend:", error));
  };

  return (
    <div>
      <h1>Frontend IP App</h1>
      <p>Your IP Address: {frontendIp}</p>
      {backendResponse && (
        <p>Backend Response: {JSON.stringify(backendResponse)}</p>
      )}
    </div>
  );
};

export default App;

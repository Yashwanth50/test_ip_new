import React, { useState, useEffect } from "react";

const App = () => {
  const [backendResponse, setBackendResponse] = useState(null);

  useEffect(() => {
    // Static IP to be sent in headers
    const staticIp = "16.171.42.32";

    // Send the static IP to the backend
    sendIpToBackend(staticIp);
  }, []);

  const sendIpToBackend = (ip) => {
    fetch("http://localhost:5000/api/submit-ip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-static-ip": ip, // Send static IP in the header
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendResponse(data);
      })
      .catch((error) => console.error("Error sending IP to backend:", error));
  };

  return (
    <div>
      <h1>Frontend Static IP App</h1>
      {backendResponse && (
        <p>Backend Response: {JSON.stringify(backendResponse)}</p>
      )}
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [backendResponse, setBackendResponse] = useState(null);

//   useEffect(() => {
//     // Static IP to be sent in headers
//     const staticIp = "16.171.42.32";

//     // Send the static IP to the backend
//     sendIpToBackend(staticIp);
//   }, []);

//   const sendIpToBackend = (ip) => {
//     fetch("http://localhost:5000/api/submit-ip", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-static-ip": ip,
//       },
//       body: JSON.stringify({}),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setBackendResponse(data);
//       })
//       .catch((error) => console.error("Error sending IP to backend:", error));
//   };

//   return (
//     <div>
//       <h1>Frontend Static IP App</h1>
//       {backendResponse && (
//         <p>Backend Response: {JSON.stringify(backendResponse)}</p>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";

// const App = () => {
//   const [backendResponse, setBackendResponse] = useState(null);

//   useEffect(() => {
//     // Automatically send a request when the component mounts
//     sendRequestToBackend();
//   }, []);

//   const sendRequestToBackend = () => {
//     // Sending the request to the frontend server, which proxies it to the backend
//     fetch("http://localhost:5000/api/submit-ip", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}), // You can add more data here if needed
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setBackendResponse(data); // Set backend response to state
//       })
//       .catch((error) =>
//         console.error("Error sending request to backend:", error)
//       );
//   };

//   return (
//     <div>
//       <h1>Frontend Static IP App</h1>
//       <button onClick={sendRequestToBackend}>Send Request to Backend</button>
//       {backendResponse && (
//         <p>Backend Response: {JSON.stringify(backendResponse)}</p>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";

const App = () => {
  const [backendResponse, setBackendResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Automatically send the request when the component mounts
    sendRequestToBackend();
  }, []);

  const sendRequestToBackend = () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    const backendUrl =
      process.env.NODE_ENV === "production"
        ? // ? "https://wc136vdvjc.execute-api.eu-north-1.amazonaws.com/test_dev"
          "https://api.yashwanths.com"
        : "http://localhost:5000/api/submit-ip"; // Local development URL

    // Fetch request to the backend (via API Gateway)
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // You can send more data here if needed
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBackendResponse(data); // Set the response from the backend
      })
      .catch((error) => {
        setError(`Error sending request to backend: ${error.message}`);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div>
      <h1>Frontend Static IP App</h1>
      <button onClick={sendRequestToBackend} disabled={loading}>
        {loading ? "Sending Request..." : "Send Request to Backend"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {backendResponse && (
        <p>Backend Response: {JSON.stringify(backendResponse)}</p>
      )}
    </div>
  );
};

export default App;

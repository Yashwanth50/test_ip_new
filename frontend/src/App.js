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

  useEffect(() => {
    sendRequestToBackend();
  }, []);

  const sendRequestToBackend = () => {
    const backendUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.yashwanths.com/api/submit-ip" // Production backend URL
        : "http://localhost:5000/api/submit-ip"; // Local development URL

    // Fetch request to the backend
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // You can add more data if needed
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendResponse(data); // Set backend response to state
      })
      .catch((error) => {
        console.error("Error sending request to backend:", error);
      });
  };

  return (
    <div>
      <h1>Frontend Static IP App</h1>
      <button onClick={sendRequestToBackend}>Send Request to Backend</button>
      {backendResponse && (
        <p>Backend Response: {JSON.stringify(backendResponse)}</p>
      )}
    </div>
  );
};

export default App;

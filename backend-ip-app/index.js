// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const app = express();
// const port = 5000;

// // Allowed static IP (only this IP will be allowed)
// const allowedIp = "16.171.42.32";

// // Middleware to check if request comes from the allowed static IP (from headers)
// const isIpAllowed = (req) => {
//   const clientIp = req.headers["x-static-ip"]; // Get IP from custom header
//   return clientIp === allowedIp;
// };

// // Custom CORS middleware to allow requests only from the allowed IP
// const corsOptionsDelegate = (req, callback) => {
//   if (isIpAllowed(req)) {
//     callback(null, { origin: true }); // Allow the request
//   } else {
//     callback(new Error("Not allowed by CORS"), { origin: false }); // Block other requests
//   }
// };

// // Apply CORS middleware
// app.use(cors(corsOptionsDelegate));
// app.use(bodyParser.json());

// // Endpoint to handle IP submissions
// app.post("/api/submit-ip", (req, res) => {
//   const clientIp = req.headers["x-static-ip"]; // Get static IP from headers

//   console.log("Received static IP from header:", clientIp);

//   if (!isIpAllowed(req)) {
//     return res.status(403).json({ message: "IP not allowed" });
//   }

//   // Further logic processing can be added here
//   res.json({ message: `IP ${clientIp} received successfully` });
// });

// app.listen(port, () => {
//   console.log(`Backend server is running on port ${port}`);
// });

const express = require("express");
const app = express();

// Middleware to get IP address from X-Forwarded-For or X-Real-IP
app.use((req, res, next) => {
  const forwarded = req.headers["x-forwarded-for"];
  const clientIp = forwarded
    ? forwarded.split(",")[0].trim() // Take the first IP from X-Forwarded-For
    : req.headers["x-real-ip"] || req.socket.remoteAddress;

  console.log(`Client IP (Frontend's IP): ${clientIp}`);

  // Only allow requests from the frontend's IP
  if (clientIp === "16.171.42.32") {
    next(); // Allow the request
  } else {
    res.status(403).json({ message: "Forbidden: Invalid IP address" });
  }
});

// Example API route
app.post("/api/submit-ip", (req, res) => {
  res.json({ message: "Request from frontend IP processed." });
});

app.listen(5000, () => {
  console.log("Backend listening on port 5000");
});

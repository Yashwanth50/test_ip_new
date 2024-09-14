const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// AWS IP Ranges (example values, you should use the actual ranges from AWS)
const allowedIps = ["16.171.42.32"]; // Update with real AWS IP ranges

// Middleware to check if request comes from an allowed IP range
const isIpAllowed = (reqIp) => {
  const ip = reqIp.replace("::ffff:", ""); // Handle IPv4 mapped IPv6 addresses
  return allowedIps.includes(ip);
};

// Custom CORS middleware to accept requests only from specific IP addresses
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://16.171.42.32",  // Your AWS Frontend IP
        "http://localhost:3000" // Localhost for testing purposes
      ];
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block other requests
      }
    },
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));
  
// Apply CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Helper to extract client IP
const reqIp = (req) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return ip ? ip.toString().replace("::ffff:", "") : null;
};

// Endpoint to receive frontend IP
app.post("/api/submit-ip", (req, res) => {
  const { ip } = req.body;
  const clientIp = reqIp(req);

  console.log("Frontend IP Received:", ip);
  console.log("Client IP:", clientIp);

  if (!isIpAllowed(clientIp)) {
    return res.status(403).json({ message: "IP not allowed" });
  }

  // Process the IP or any further logic

  res.json({ message: `IP ${ip} received successfully` });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

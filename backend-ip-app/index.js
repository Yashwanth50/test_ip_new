const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// AWS IP Ranges (example values, you should use the actual ranges from AWS)
const allowedIps = ["52.94.0.0/16", "54.239.0.0/16"]; // Update with real AWS IP ranges

// Middleware to check if request comes from an allowed IP range
const isIpAllowed = (reqIp) => {
  const ip = reqIp.replace("::ffff:", ""); // Handle IPv4 mapped IPv6 addresses
  return allowedIps.some((allowedIp) => {
    return ipInRange(ip, allowedIp);
  });
};

// Simple IP range check function (basic CIDR checking)
const ipInRange = (ip, range) => {
  const [rangeIp, bits = 32] = range.split("/");
  const mask = ~(2 ** (32 - bits) - 1);
  const ip2int = (ip) =>
    ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);

  return (ip2int(ip) & mask) === (ip2int(rangeIp) & mask);
};

// Custom CORS middleware to accept requests only from specific IPs
const corsOptions = {
  origin: function (origin, callback) {
    const clientIp = reqIp;
    if (isIpAllowed(clientIp)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Endpoint to receive frontend IP
app.post("/api/submit-ip", (req, res) => {
  const { ip } = req.body;
  console.log("Frontend IP Received:", ip);

  // Here you can process the IP as you need (log it, store it, etc.)

  // Send a response back to the frontend
  res.json({ message: `IP ${ip} received successfully` });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

// Helper to extract client IP
const reqIp = (req) => {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

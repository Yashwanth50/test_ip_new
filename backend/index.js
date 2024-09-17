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

// const express = require("express");
// const app = express();
// const cors = require("cors");
// // Middleware to get IP address from X-Forwarded-For or X-Real-IP

// app.use(cors());
// app.use((req, res, next) => {
//   const forwarded = req.headers["x-forwarded-for"];
//   const clientIp = forwarded
//     ? forwarded.split(",")[0].trim() // Take the first IP from X-Forwarded-For
//     : req.headers["x-real-ip"] || req.socket.remoteAddress;

//   console.log(`Client IP (Frontend's IP): ${clientIp}`);

//   // Only allow requests from the specific IP 16.171.42.32
//   if (clientIp === "16.171.42.32") {
//     next(); // Allow the request
//   } else {
//     res.status(403).json({ message: "Forbidden: Invalid IP address" });
//   }
// });

// // Example API route
// app.post("/api/submit-ip", (req, res) => {
//   res.json({ message: "Request from frontend IP processed." });
// });

// app.listen(5000, () => {
//   console.log("Backend listening on port 5000");
// });
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const port = 5000;
// const cors = require("cors");

// app.set("trust proxy", true);

// app.use(cors());
// // Allowed static IP (only this IP will be allowed)
// const allowedIp = "13.60.161.207";

// // Middleware to check if the request comes from the allowed static IP (using actual client IP)
// const checkAllowedIp = (req, res, next) => {
//   // Get the actual client IP address (can vary depending on your environment, especially with reverse proxies)
//   const clientIp =
//     req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;

//   console.log("Received IP from request:", clientIp);

//   // If the client IP matches the allowed IP, continue processing the request
//   if (clientIp === allowedIp) {
//     next(); // IP allowed, continue
//   } else {
//     // If the IP does not match, return 403 Forbidden
//     res.status(403).json({ message: "Forbidden: IP not allowed" });
//   }
// };

// // Apply bodyParser middleware to handle JSON requests
// app.use(bodyParser.json());

// // Apply the IP restriction middleware to the POST route
// app.post("/api/submit-ip", checkAllowedIp, (req, res) => {
//   const clientIp =
//     req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;
//   console.log(`IP ${clientIp} is allowed.`);

//   // Further processing logic
//   res.json({ message: `IP ${clientIp} received successfully` });
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Backend server is running on port ${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

// Let Express know it's behind a proxy (important for trusting X-Forwarded-For headers)
app.set("trust proxy", true);

// Allow cross-origin requests (CORS)
app.use(cors());

// Allowed static IP (the only IP that is allowed to make requests)
const allowedIp = "13.60.161.207";

// Middleware to check if the request comes from the allowed static IP
const checkAllowedIp = (req, res, next) => {
  // Check the client IP from X-Forwarded-For (set by Nginx) or fallback to default IP detection
  const clientIp =
    req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip;

  console.log("Received IP from request:", clientIp);

  // If the client IP matches the allowed IP, continue processing the request
  if (clientIp === allowedIp) {
    next(); // IP allowed, proceed to the next middleware or route handler
  } else {
    // If the IP does not match, return a 403 Forbidden response
    res.status(403).json({ message: "Forbidden: IP not allowed" });
  }
};

// Apply bodyParser middleware to handle JSON requests
app.use(bodyParser.json());

// Apply the IP restriction middleware to the POST route
app.post("/api/submit-ip", checkAllowedIp, (req, res) => {
  const clientIp =
    req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip;
  console.log(`IP ${clientIp} is allowed.`);

  // Further processing logic here
  res.json({ message: `IP ${clientIp} received successfully` });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

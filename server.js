const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home route
app.get("/", (req, res) => {
  res.status(200).send("My Week 2 API!");
});

// Create a user
app.post("/user", (req, res) => {
  const { name, email } = req.body || {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({
      error: "Name and email are required."
    });
  }

  return res.status(201).json({
    message: `Hello, ${name.trim()}!`,
    email: email.trim()
  });
});

// Get a user profile
app.get("/user/:id", (req, res) => {
  return res.status(200).json({
    message: `User ${req.params.id} profile`
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Handle errors, including invalid JSON
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({
      error: "Invalid JSON format."
    });
  }

  console.error(err);

  return res.status(500).json({
    error: "Internal server error"
  });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const express = require("express");

const sessionRoutes =
  require("./routes/session-routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "backend_sessionmanagementservice"
  });
});

app.use("/sessions", sessionRoutes);

module.exports = app;
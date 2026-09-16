const express = require("express");

const providerRoutes =
  require("./routes/provider-routes");

const app = express();

app.use(express.json());


app.get("/health", (req, res) => {

  res.status(200).json({
    status: "UP",
    service: "conversation-provider"
  });

});


app.use(
  "/provider",
  providerRoutes
);


module.exports = app;
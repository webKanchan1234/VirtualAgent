const http = require("http");

const app =
  require("./app");

const config =
  require("./config/config");


const server =
  http.createServer(app);


server.listen(
  config.port,
  () => {

    console.log(
      `backend_core_choreographerservice listening on port ${config.port}`
    );

  }
);
const http = require("http");

const app = require("./app");
const config = require("./config/config");
const redisClient=require("./config/redis")


const startServer=async()=>{

  try {
    await redisClient.connect()
    console.log("redis connected")

    const server=http.createServer(app)

    server.listen(config.port,()=>{
      console.log(`backend_sessionmanagementservice listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Failed to start session management service: ${error}`)
    process.exit(1)
  }
}

startServer()
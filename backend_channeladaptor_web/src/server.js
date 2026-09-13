const http=require('http');
const {Server}=require("socket.io")
const app=require('./app');
const config=require("./config/config");
const registerSocketConnection=require("./socket/socket-handler")
const server=http.createServer(app);


const io=new Server(server,{
    cors:{
        origin: "http://localhost:5173",
    }
})

registerSocketConnection(io)

server.listen(config.port,()=>{
    console.log(`backend_channeladaptor_web listening on port ${config.port}`);
});
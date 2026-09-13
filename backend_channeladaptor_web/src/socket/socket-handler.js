
const registerSocketConnection =(io)=>{
    io.on("connection",(socket)=>{
        console.log(`WebSocket client connected: ${socket.id}`)

        socket.on("disconnect",(reason)=>{
            console.log(`WebSocket client disconnected: ${socket.id}, reason: ${reason}`)
        })
    })
}

module.exports=registerSocketConnection
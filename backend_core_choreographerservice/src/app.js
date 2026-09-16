const express=require("express")
const app=express()
const conversationRoute=require("./routes/conversation-routes")

app.use(express.json())



app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"UP",
        service:"backend_core_choreographerservice"
    })
})


app.use("/conversations",conversationRoute)


module.exports=app
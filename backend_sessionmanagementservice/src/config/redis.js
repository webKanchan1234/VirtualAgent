const {createClient} =require("redis")

const REDIS_URL=process.env.REDIS_URL || "redis://localhost:6379";

const redisClient=createClient({
    url:REDIS_URL
})

redisClient.on("error",(error)=>{
    console.error("Redis client error:",error)
})

module.exports=redisClient
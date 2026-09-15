const redisClient =require("../config/redis")

const SESSION_PREFIX = "session:";
const SESSION_TTL_SECONDS = 30 * 60;

const getKey=(conversationId)=>{
    return `${SESSION_PREFIX}${conversationId}`;
}


const save=async(session)=>{
    const key=getKey(session.conversationId)

    await redisClient.set(key,JSON.stringify(session),{EX:SESSION_TTL_SECONDS})

    return session
}

const getByConversationId=(conversationId)=>{

    const key=getKey(conversationId)
    const data=redisClient.get(key)

    if(!data){
        return null
    }

    return JSON.parse(data)
}

const refresh = async (
  conversationId
) => {

  const key =
    getKey(conversationId);

  return redisClient.expire(
    key,
    SESSION_TTL_SECONDS
  );
};


const deleteByConversationId=async(conversationId)=>{

    const key=getKey(conversationId)
    await redisClient.del(key)

    if(!data){
        return null
    }
    return JSON.parse(data)
}


module.exports={
    save,
    getByConversationId,
    refresh,
    deleteByConversationId
}
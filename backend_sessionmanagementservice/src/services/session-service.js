const {randomUUID}=require("crypto")
const sessionRepository=require("../repositories/session-repository")
// const sessions=new Map()


const createSession=async()=>{
    const conversationId=randomUUID();

    const session={
        conversationId,
        status:"ACTIVE",
        createdAt: new Date().toISOString()
    }

    // sessions.set(conversationId,session)
    await sessionRepository.save(session)
    return session
}

const getSession=async(conversationId)=>{
    // return sessions.get(conversationId);
    return sessionRepository.getByConversationId(conversationId)
}

const refreshSession = async (
  conversationId
) => {

  const refreshed =
    await sessionRepository.refresh(
      conversationId
    );

  return refreshed === 1;
};

const endSession=async(conversationId)=>{
    // const session=sessions.get(conversationId)
    const session=await sessionRepository.getByConversationId(conversationId)

    if(!session){
        return null
    }

    sessions.status="END"
    session.endedAt =
    new Date().toISOString();

    await sessionRepository.save(session)

    return session;
}

module.exports={
    createSession,
    getSession,
    refreshSession,
    endSession
}
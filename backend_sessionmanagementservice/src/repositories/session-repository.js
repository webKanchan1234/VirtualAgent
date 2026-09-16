const redisClient = require("../config/redis");

const SESSION_PREFIX = "session:";

const SESSION_TTL_SECONDS = 30 * 60;


const getKey = (conversationId) => {
  return `${SESSION_PREFIX}${conversationId}`;
};


// --------------------------------------------------
// Save session
// --------------------------------------------------

const save = async (session) => {

  const key =
    getKey(session.conversationId);

  await redisClient.set(
    key,
    JSON.stringify(session),
    {
      EX: SESSION_TTL_SECONDS
    }
  );

  return session;
};


// --------------------------------------------------
// Get session
// --------------------------------------------------

const getByConversationId = async (
  conversationId
) => {

  const key =
    getKey(conversationId);

  const data =
    await redisClient.get(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};


// --------------------------------------------------
// Refresh session TTL
// --------------------------------------------------

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


// --------------------------------------------------
// Delete session
// --------------------------------------------------

const deleteByConversationId = async (
  conversationId
) => {

  const key =
    getKey(conversationId);

  await redisClient.del(key);
};


module.exports = {
  save,
  getByConversationId,
  refresh,
  deleteByConversationId
};
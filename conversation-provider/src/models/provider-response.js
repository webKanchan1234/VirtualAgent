const {
  randomUUID
} = require("crypto");


const RESPONSE_TYPES = {
  BOT_MESSAGE: "bot_message",
  ERROR: "error"
};


const createBotResponse = ({
  conversationId,
  responseToMessageId,
  text,
  metadata = {}
}) => {

  return {

    messageId:
      randomUUID(),

    responseToMessageId,

    conversationId,

    type:
      RESPONSE_TYPES.BOT_MESSAGE,

    text,

    metadata,

    timestamp:
      new Date().toISOString()
  };
};


module.exports = {
  RESPONSE_TYPES,
  createBotResponse
};
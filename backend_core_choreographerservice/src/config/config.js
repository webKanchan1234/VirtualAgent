const PORT = process.env.PORT || 3002

const CONVERSATION_PROVIDER_URL =
  process.env.CONVERSATION_PROVIDER_URL ||
  "http://localhost:3003";


module.exports={
    port:PORT,
    conversationProviderUrl:CONVERSATION_PROVIDER_URL
}
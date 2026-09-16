const {
  processMessage:
    processProviderMessage
} = require(
  "../clients/conversation-provider-client"
);


const processMessage = async (
  message
) => {

  console.log(
    "Core Choreographer processing:",
    message
  );


  try {

    const response =
      await processProviderMessage(
        message
      );


    return response;


  } catch (error) {

    console.error(
      "Conversation provider failed:",
      error
    );


    throw error;

  }

};


module.exports = {
  processMessage
};
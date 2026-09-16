const {
  createBotResponse
} = require("../models/provider-response");

const {
  ProviderError
} = require("../models/provider-error");


const processMessage = async (
  message
) => {

  console.log(
    "Conversation Provider received:",
    message
  );


  try {

    // ----------------------------------------------
    // Temporary mock provider
    // ----------------------------------------------

    const providerResponse = {

      text:
        `You send ${message.text}`,

      metadata: {

        provider:
          "mock",

        model:
          "mock-provider"

      }

    };


    // ----------------------------------------------
    // Normalize provider response
    // ----------------------------------------------

    const response =
      createBotResponse({

        conversationId:
          message.conversationId,

        responseToMessageId:
          message.messageId,

        text:
          providerResponse.text,

        metadata:
          providerResponse.metadata

      });


    console.log(
      "Normalized provider response:",
      response
    );


    return response;


  } catch (error) {

    console.error(
      "Provider processing failed:",
      error
    );


    if (
      error instanceof ProviderError
    ) {

      throw error;
    }


    throw new ProviderError(
      "Conversation provider failed",
      "PROVIDER_ERROR",
      false
    );

  }

};


module.exports = {
  processMessage
};
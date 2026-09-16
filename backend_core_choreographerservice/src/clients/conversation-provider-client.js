const config =
  require("../config/config");


const processMessage = async (
  message
) => {

  const url =
    `${config.conversationProviderUrl}/provider/messages`;


  console.log(
    `Calling conversation provider: POST ${url}`
  );


  try {

    const response =
      await fetch(
        url,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(message)
        }
      );


    const body =
      await response.text();


    console.log(
      "Conversation provider HTTP status:",
      response.status
    );


    console.log(
      "Conversation provider response:",
      body
    );


    if (!response.ok) {

      const error =
        new Error(
          `Conversation provider returned ${response.status}: ${body}`
        );


      error.status =
        response.status;


      error.responseBody =
        body;


      throw error;
    }


    try {

      return JSON.parse(body);

    } catch (parseError) {

      const error =
        new Error(
          "Invalid JSON response from conversation provider"
        );


      error.status =
        response.status;


      error.cause =
        parseError;


      throw error;
    }


  } catch (error) {

    console.error(
      "Conversation provider request failed:",
      error
    );


    throw error;
  }

};


module.exports = {
  processMessage
};
const config =
  require("../config/config");


const processMessage = async (
  message
) => {

  const url =
    `${config.coreChoreographerUrl}/conversations/messages`;


  console.log(
    `Calling core choreographer: POST ${url}`
  );


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
    "Core choreographer response:",
    body
  );


  if (!response.ok) {

    throw new Error(
      `Core choreographer returned ${response.status}: ${body}`
    );

  }


  return JSON.parse(body);
};


module.exports = {
  processMessage
};
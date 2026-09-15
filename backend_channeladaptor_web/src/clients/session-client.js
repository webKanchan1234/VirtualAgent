const config = require("../config/config");

const createSession = async () => {

  const url =
    `${config.sessionServiceUrl}/sessions`;

  console.log(
    `Calling session service: POST ${url}`
  );

  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(
      "Session service HTTP status:",
      response.status
    );

    const body = await response.text();

    console.log(
      "Session service response body:",
      body
    );

    if (!response.ok) {

      throw new Error(
        `Session service returned ${response.status}: ${body}`
      );
    }

    return JSON.parse(body);

  } catch (error) {

    console.error(
      "Session service request failed:",
      error
    );

    throw error;
  }
};


const getSession = async (conversationId) => {

  const url =
    `${config.sessionServiceUrl}/sessions/${conversationId}`;

  const response = await fetch(url);

  const body = await response.text();

  if (!response.ok) {

    if (response.status === 404) {
      return null;
    }

    throw new Error(
      `Session service returned ${response.status}: ${body}`
    );
  }

  return JSON.parse(body);
};

const refreshSession = async (
  conversationId
) => {

  const response =
    await fetch(
      `${config.sessionServiceUrl}/sessions/${conversationId}/refresh`,
      {
        method: "POST"
      }
    );

  if (!response.ok) {

    if (response.status === 404) {
      return false;
    }

    throw new Error(
      `Session service returned ${response.status}`
    );
  }

  return true;
};


const endSession = async (conversationId) => {

  const url =
    `${config.sessionServiceUrl}/sessions/${conversationId}`;

  const response = await fetch(url, {
    method: "DELETE"
  });

  const body = await response.text();

  if (!response.ok) {

    throw new Error(
      `Session service returned ${response.status}: ${body}`
    );
  }

  return JSON.parse(body);
};


module.exports = {
  createSession,
  getSession,
  refreshSession,
  endSession
};
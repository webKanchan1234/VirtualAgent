const { randomUUID } = require("crypto");

const { MESSAGE_TYPES } = require("../models/message");

const {
  validateWebInMessage
} = require("../validation/message-validator");

const {
  createSession,
  getSession,
  refreshSession,
  endSession
} = require("../clients/session-client");


const registerSocketHandlers = (io) => {

  io.on("connection", async (socket) => {

    console.log(
      `WebSocket client connected: ${socket.id}`
    );


    // --------------------------------------------------
    // Create conversation/session
    // --------------------------------------------------

    try {

      const session =
        await createSession();

      const conversationId =
        session.conversationId;

      socket.data.conversationId =
        conversationId;

      console.log(
        `Conversation created: ${conversationId} for socket: ${socket.id}`
      );

      socket.emit(
        "conversationStarted",
        {
          conversationId
        }
      );

    } catch (error) {

      console.error(
        "Failed to create conversation:",
        error
      );

      socket.emit(
        "sessionError",
        {
          message:
            "Unable to start conversation"
        }
      );

      socket.disconnect();

      return;
    }


    // --------------------------------------------------
    // Receive message from Web
    // --------------------------------------------------

    socket.on("webIn", async (message) => {

      console.log(
        `webIn received from ${socket.id}:`,
        message
      );


      const conversationId =
        socket.data.conversationId;


      // ------------------------------------------------
      // Validate message
      // ------------------------------------------------

      const validation =
        validateWebInMessage(message);

      if (!validation.valid) {

        socket.emit(
          "webOut",
          {
            messageId:
              message?.messageId ||
              randomUUID(),

            type:
              "error",

            text:
              validation.error,

            conversationId,

            timestamp:
              new Date().toISOString()
          }
        );

        return;
      }


      // ------------------------------------------------
      // Validate conversation ID
      // ------------------------------------------------

      if (
        message.conversationId !==
        conversationId
      ) {

        socket.emit(
          "webOut",
          {
            messageId:
              randomUUID(),

            type:
              "error",

            text:
              "Invalid conversationId",

            conversationId,

            timestamp:
              new Date().toISOString()
          }
        );

        return;
      }


      // ------------------------------------------------
      // Verify session
      // ------------------------------------------------

      try {

        const session =
          await getSession(conversationId);


        if (!session) {

          socket.emit(
            "webOut",
            {
              messageId:
                randomUUID(),

              responseToMessageId:
                message.messageId,

              type:
                "error",

              text:
                "Conversation not found",

              conversationId,

              timestamp:
                new Date().toISOString()
            }
          );

          return;
        }


        if (
          session.status !==
          "ACTIVE"
        ) {
          await refreshSession(
            conversationId
          );

          socket.emit(
            "webOut",
            {
              messageId:
                randomUUID(),

              responseToMessageId:
                message.messageId,

              type:
                "error",

              text:
                "Conversation is no longer active",

              conversationId,

              timestamp:
                new Date().toISOString()
            }
          );

          return;
        }


        // ----------------------------------------------
        // Create bot response
        // ----------------------------------------------

        const response = {

          messageId:
            randomUUID(),

          responseToMessageId:
            message.messageId,

          type:
            MESSAGE_TYPES.BOT_MESSAGE,

          text:
            `You send ${message.text}`,

          conversationId,

          timestamp:
            new Date().toISOString()
        };


        console.log(
          `webOut sent to ${socket.id}:`,
          response
        );


        socket.emit(
          "webOut",
          response
        );

      } catch (error) {

        console.error(
          `Failed to verify session ${conversationId}:`,
          error
        );


        socket.emit(
          "webOut",
          {
            messageId:
              randomUUID(),

            responseToMessageId:
              message.messageId,

            type:
              "error",

            text:
              "Unable to verify conversation",

            conversationId,

            timestamp:
              new Date().toISOString()
          }
        );

      }

    });


    // --------------------------------------------------
    // WebSocket disconnect
    // --------------------------------------------------

    socket.on("disconnect", async (reason) => {

      console.log(
        `WebSocket client disconnected: ${socket.id}, reason: ${reason}`
      );


      const conversationId =
        socket.data.conversationId;


      if (!conversationId) {
        return;
      }


      try {

        await endSession(
          conversationId
        );

        console.log(
          `Conversation ended: ${conversationId}`
        );

      } catch (error) {

        console.error(
          `Failed to end conversation ${conversationId}:`,
          error
        );

      }

    });

  });

};


module.exports = registerSocketHandlers;
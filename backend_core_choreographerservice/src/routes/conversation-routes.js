const express = require("express");

const {
  processMessage
} = require(
  "../services/conversation-service"
);


const router =
  express.Router();


router.post(
  "/messages",
  async (req, res) => {

    try {

      const message =
        req.body;


      if (
        !message ||
        typeof message !== "object"
      ) {

        return res.status(400).json({
          error:
            "Message is required"
        });

      }


      const response =
        await processMessage(
          message
        );


      return res.status(200).json(
        response
      );


    } catch (error) {

      console.error(
        "Failed to process conversation:",
        error
      );


      // --------------------------------------------
      // Provider unavailable
      // --------------------------------------------

      if (
        error.status === 502 ||
        error.code === "ECONNREFUSED"
      ) {

        return res.status(503).json({

          error:
            "Conversation provider unavailable",

          code:
            "PROVIDER_UNAVAILABLE"

        });

      }


      // --------------------------------------------
      // Provider error
      // --------------------------------------------

      return res.status(502).json({

        error:
          "Conversation provider failed",

        code:
          "PROVIDER_ERROR"

      });

    }

  }
);


module.exports = router;
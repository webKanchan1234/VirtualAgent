const express = require("express");

const {
  processMessage
} = require("../services/provider-service");


const router =
  express.Router();


router.post(
  "/messages",
  async (req, res) => {

    try {

      const message =
        req.body;


      if (!message) {

        return res.status(400).json({
          error:
            "Message is required"
        });

      }


      const response =
        await processMessage(
          message
        );


      res.status(200).json(
        response
      );

    } catch (error) {

      console.error(
        "Failed to process provider message:",
        error
      );


      res.status(500).json({
        error:
          "Failed to process message"
      });

    }

  }
);


module.exports = router;
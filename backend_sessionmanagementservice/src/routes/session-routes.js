const express = require("express");

const {
  createSession,
  getSession,
  refreshSession,
  endSession
} = require("../services/session-service");

const router = express.Router();

router.post("/", async(req, res) => {

  try {

    const session =
      await createSession();

    res.status(201).json(session);

  } catch (error) {

    console.error(
      "Failed to create session:",
      error
    );

    res.status(500).json({
      error: "Failed to create session"
    });

  }

});

router.get("/:conversationId", async(req, res) => {

    try {
        const {conversationId}=req.params
        const sesssion=await getSession(conversationId)

        if(!sesssion){
            return res.status(404).json({
                error:"Conversation not found"
            })
        }

        return res.status(200).json(sesssion)
    } catch (error) {
        console.error(
        "Failed to get session:",
        error
      );

      res.status(500).json({
        error: "Failed to get session"
      });
    }
  
});

router.post(
  "/:conversationId/refresh",
  async (req, res) => {

    try {

      const {
        conversationId
      } = req.params;

      const refreshed =
        await refreshSession(
          conversationId
        );

      if (!refreshed) {

        return res.status(404).json({
          error:
            "Conversation not found"
        });
      }

      res.status(200).json({
        conversationId,
        status: "ACTIVE"
      });

    } catch (error) {

      console.error(
        "Failed to refresh session:",
        error
      );

      res.status(500).json({
        error:
          "Failed to refresh session"
      });
    }
  }
);

router.delete(
  "/:conversationId",
  async (req, res) => {

    try {

      const {
        conversationId
      } = req.params;

      const session =
        await endSession(
          conversationId
        );


      if (!session) {

        return res.status(404).json({
          error:
            "Conversation not found"
        });

      }


      res.status(200).json(session);

    } catch (error) {

      console.error(
        "Failed to end session:",
        error
      );

      res.status(500).json({
        error: "Failed to end session"
      });

    }

  }
);


module.exports = router;
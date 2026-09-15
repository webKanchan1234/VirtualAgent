const {MESSAGE_TYPES}=require("../models/message")

const validateWebInMessage=(message)=>{

    if(!message || typeof message !=="object"){
        return{
            valid:false,
            error:"Message must be an object"
        }
    }

    console.log("message",message)
    if(!message.messageId || typeof message.messageId !=="string"){
        return {
            valid:false,
            error:"messageId must be required"
        }
    }

    if (message.type !== MESSAGE_TYPES.USER_MESSAGE) {
        return {
            valid: false,
            error: "Invalid message type"
        };
    }
    

    if (
        !message.text ||
        typeof message.text !== "string"
    ) {
        return {
            valid: false,
            error: "text is required"
        };
    }

    if (message.text.trim().length === 0) {
        return {
            valid: false,
            error: "text cannot be empty"
        };
    }

    return {
        valid: true
    };
}

module.exports={
    validateWebInMessage
}
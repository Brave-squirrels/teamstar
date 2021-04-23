const Joi = require("joi-oid");

import Chat from "../../interfaces/chat.interface";

// Validating new chat
export default function validateChat(chat: Chat) {
  const schema = Joi.object({
    name: Joi.string().required(),
    teamId: Joi.objectId().required(),
  });

  return schema.validate(chat);
}

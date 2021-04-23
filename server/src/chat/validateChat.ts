const Joi = require("joi-oid");

import Chat from "../../interfaces/chat.interface";

// Validating new chat
export default function validateChat(chat: Chat) {
  const schema = Joi.object({
    name: Joi.string().required(),
    teamId: Joi.objectId().required(),
    message: Joi.object({
      messageName: Joi.string().required(),
      authorName: Joi.string().required(),
      authorId: Joi.objectId().required(),
      content: Joi.string().required(),
    }),
  });

  return schema.validate(chat);
}

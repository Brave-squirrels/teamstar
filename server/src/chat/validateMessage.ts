const Joi = require("joi-oid");

import Message from "../../interfaces/message.interface";

// Validating new message
export default function validateMessage(message: Message) {
  const schema = Joi.object({
    content: Joi.string().required(),
  });

  return schema.validate(message);
}

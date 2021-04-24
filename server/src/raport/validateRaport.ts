import Joi from "joi";
import User from "../../interfaces/user.interface";

export default function validateRaport(data: object) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24).required(),
    description: Joi.string().min(0).max(254).required(),
    data: Joi.string(),
    author: Joi.object({
      name: Joi.string().required(),
      id: Joi.string().required(),
    }).required(),
    team: Joi.object({
      name: Joi.string().required(),
      id: Joi.required(),
    }).required(),
  });

  return schema.validate(data);
}

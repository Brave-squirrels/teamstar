import Joi from "joi";
import User from "../../interfaces/user.interface";

export default function validateCreateTeam(data: object) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24).required(),
    description: Joi.string().min(0).max(254).required(),
    data: Joi.string(),
    author: Joi.object({
      name: Joi.string().required(),
      id: Joi.string().required(),
    }).required(),
  });

  return schema.validate(data);
}

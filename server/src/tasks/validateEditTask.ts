import Joi from "joi";

export default function validateEditTask(data: object) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24).required(),
    description: Joi.string().min(0).max(254).required(),
  });

  return schema.validate(data);
}

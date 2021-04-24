import Joi from "joi";

export default function validateCreateTask(data: object) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24).required(),
    description: Joi.string().min(0).max(254).required(),
    team: Joi.object({
      teamName: Joi.string().required(),
      teamId: Joi.required(),
    }).required(),
  });

  return schema.validate(data);
}

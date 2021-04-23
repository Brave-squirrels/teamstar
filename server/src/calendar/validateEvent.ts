import Joi from "joi";
import Event from "../../interfaces/event.interface";

export default function validateEvent(data: Event) {
  const schema = Joi.object({
    creator: Joi.object({
        id: Joi.string().required(),
        team: Joi.string().required()
    }),
    title: Joi.string().min(3).max(64).required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    desc: Joi.string().max(254).required()
  });

  return schema.validate(data);
}

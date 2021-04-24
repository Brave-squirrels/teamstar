import Joi from "joi-oid";
import Event from "../../interfaces/event.interface";

export default function validateEvent(data: Event) {
  const schema = Joi.object({
    author: Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().required()
    }),
    title: Joi.string().min(3).max(64).required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    desc: Joi.string().max(254).required(),
    fromHour: Joi.string().required(),
    toHour: Joi.string().required()
  });

  return schema.validate(data);
}

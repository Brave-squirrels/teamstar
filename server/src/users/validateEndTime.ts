import Joi from "joi";
import User from "../../interfaces/user.interface";

export default function validateTime(user: User) {
  const schema = Joi.object({
    endTime: Joi.string()
      .regex(/(\d{2}):(\d{2}):(\d{2})/)
      .required(),
  });

  return schema.validate(user);
}

import Joi from "joi";
import User from "../../interfaces/user.interface";

export default function validateTime(user: User) {
  const schema = Joi.object({
    breakTime: Joi.string().required(),
  });

  return schema.validate(user);
}

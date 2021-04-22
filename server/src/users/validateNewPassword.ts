import Joi from "joi";
import JoiPasswordComplexity from "joi-password";
import User from "../../interfaces/user.interface";

export default function validatePassword(user: User) {
  const schema = Joi.object({
    password: JoiPasswordComplexity.string()
      .minOfSpecialCharacters(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required(),
    confirmPassword: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}

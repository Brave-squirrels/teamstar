import Joi from "joi";

export default function validateEmail(email: { email: string }) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        newEmail: Joi.string().min(5).max(50).email(),
    });

    return schema.validate(email);
}
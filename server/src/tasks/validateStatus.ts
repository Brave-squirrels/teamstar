import Joi from "joi";
import { STATUS } from "../../interfaces/task.interface";

export default function validateStatus(data: any) {
  const schema = Joi.object({
    status: Joi.valid(STATUS.DONE, STATUS.INPROGRESS, STATUS.TODO).required(),
  });

  return schema.validate(data);
}

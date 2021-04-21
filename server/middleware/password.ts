import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import passwordComplexity from "joi-password-complexity";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const { error } = passwordComplexity().validate(req.body.password);
  if (error)
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  if (req.body.confirmPassword) {
    if (req.body.password !== req.body.confirmPassword)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("New password and confirm password must be the same.");

    const { error } = passwordComplexity().validate(req.body.password);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  }

  next();
}

import { StatusCodes } from "http-status-codes"
import { Response, Request } from "express";

const badRequest = async (req: Request, res: Response) => {
    return res.status(StatusCodes.BAD_REQUEST).send();
}

export default badRequest;
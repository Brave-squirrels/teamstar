import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import userModel from "../../models/user.model";
import jwt from 'jsonwebtoken';

const changeConnectionStatus = async (token, status) => {
    if(token!=="null") {
    const decoded:any = jwt.decode(token);
    const user = await userModel.findById(decoded._id);
    if(status) {
        user.set({
            isOnline: true
        })
    } else {
        user.set({
            isOnline: false
        });
    }

    await user.save();
    return user.isOnline;
}
};

export default changeConnectionStatus;

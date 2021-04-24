import _ from "lodash";
import userModel from "../../models/user.model";
import jwt from 'jsonwebtoken';
import teamModel from '../../models/team.model';

const changeConnectionStatus = async (token, status) => {
    if (token !== "null") {
        const decoded: any = jwt.decode(token);
        const user = await userModel.findById(decoded._id);
        const team = await teamModel.find();
        if (status) {
            team.forEach((singleTeam: any) => {
                singleTeam.users.forEach(async (usr, i) => {
                    if (usr.id.toString() == user._id.toString()) {
                        singleTeam.users[i].status = true;
                        await singleTeam.save();
                    }
                })
            })
            user.set({
                isOnline: true
            })
        } else {
            team.forEach((singleTeam: any) => {
                singleTeam.users.forEach(async (usr, i) => {
                    if (usr.id.toString() == user._id.toString()) {
                        singleTeam.users[i].status = false;
                        await singleTeam.save();
                    }
                })
            })
            user.set({
                isOnline: false
            });
        }

        await user.save();
        return user.isOnline;
    }
};

export default changeConnectionStatus;

import { Request, Response } from "express";
import chatModel from '../models/chat.model';
import userModel from '../models/user.model';

const createChat = async (req: Request, res: Response) => {

    const team = res.locals.team;
    const user = await userModel.findById(req.userInfo._id);
    const newChat = new chatModel({
        teamId: team._id,
        name: 'Chat of ' + team.name,
        messages: []
    })

    await newChat.save();

    user.chats.push({
        teamId: newChat.teamId,
        chatId: newChat._id,
        chatName: newChat.name,
      });
    
      await user.save();
}

export default createChat;
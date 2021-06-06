import { hash } from "bcrypt";
import userSchema from "../models/User"
import { CallbackError, Document } from "mongoose";

import {
    Request,
    Response,
    NextFunction
} from "express"

import path from "path"
import { verify } from "../services/crypto.service";
const jwt = require('jsonwebtoken');

function generateAccessToken(emailAddress: any) {
    return jwt.sign(emailAddress, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function sendLoginMW(req: Request, res: Response) {
    var token:any;

    var valami = "";
    const users = userSchema.findOne({ emailAddress: req.body.emailAddress }).exec();
    console.log(users);
    
    users.then(function (user) {
        if (user === undefined || user === null)
        {
            res.json({"error": "Invalid email or password"});
            res.status(400); //bad request
            return;
        }
        console.log(req.body.emailAddress);
        valami = user?.get('password');
        token = "";
        console.log(user);
        if (verify(req.body.password, valami))
        {
            token = generateAccessToken({ emailAddress: req.body.emailAddress });
            const users = userSchema.findOne({ emailAddress: req.body.emailAddress}).exec();
            users.then(function (user) {
            console.log("USER="+user);
            res.json({'accessToken':token, "_id":user?._id,"firstName":user?.get("firstName"),"lastName":user?.get("lastName"),"emailAddress":user?.get("emailAddress")});
            });
            console.log("TOKEN="+token);
            
        } 
        else//valid email, invalid pass
        {
            res.json({"error": "Invalid email or password"});
            res.status(400); //bad request
            return;
        }
    }); 
}
export default sendLoginMW;

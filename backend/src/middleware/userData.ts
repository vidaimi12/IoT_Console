import { hash } from "bcrypt";
import userSchema from "../models/User"
import { CallbackError, Document } from "mongoose";
import jwt_decode, { JwtPayload } from 'jwt-decode';

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

function parseJwt(token:  any) {
    var atob = require('atob');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c: any) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function sendUserFromToken(req: Request, res: Response) {
    var token = req.headers['x-access-token'];
    console.log(token);
    if (token === undefined || token == undefined || token === null || token == null)
    {
        console.log("undefined");
        res.json({"error": "Invalid token"});
        res.status(400); //bad request
        return;
    }
    if (typeof token === 'undefined' || typeof token == 'undefined' || typeof token === undefined || typeof token == undefined)
    {
        console.log("undefined2");
        res.json({"error": "Invalid token typeof"});
        res.status(400); //bad request
        return;
    }
    const decoded1 = parseJwt(token);
    console.log(decoded1.emailAddress);
    const users = userSchema.findOne({ emailAddress: decoded1.emailAddress}).exec();
    users.then(function (user) {
       console.log(user);
        res.json(user);
    });
}
export default sendUserFromToken;
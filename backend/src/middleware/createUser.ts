import { CallbackError, Document } from "mongoose";
import userSchema from "../models/User";
import User from "../models/User";
import { hash, verify } from "../services/crypto.service";

import express, {
    Request,
    Response
} from "express"

function createUser(req: Request, res: Response) {
    console.log(req.body);
    const users = userSchema.findOne({ emailAddress: req.body?.emailAddress }).exec();
    users.then(function (user) {
        if (!(user === undefined || user === null)) {
            res.status(400);
            res.send({ error: "Email address already used" }).end();

        }
        else {
            User.create(new User({
                firstName: req.body?.firstName,
                lastName: req.body?.lastName,
                emailAddress: req.body?.emailAddress,
                password: hash(req.body.password ?? "")
            }), (err: CallbackError, user: any) => {
                console.log("User created: " + user.firstName + " " + user.lastName);
                console.log(user);
                console.log(err);
            });
            res.status(200);
            res.send({}).end();
        }
    });
}
export default createUser;
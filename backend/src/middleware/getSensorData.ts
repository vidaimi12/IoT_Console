import dataSchema from "../models/Data";
import { CallbackError, Document } from "mongoose";
import express, {
    Request,
    Response
} from "express"

function getSensorData(req: Request, res: Response) {
    var result: any[] = new Array(0);
    console.log("BODY:"+req.body);
    console.log("UserID:"+req.body.userID);
    const datas = dataSchema.find({ user: req.body.userID }).distinct("sensorName", {}).exec();
    datas.then(function (data) {
        res.json(JSON.stringify(data));
        res.status(200).end();
        console.log(JSON.stringify(data));
    });

}
export default getSensorData;
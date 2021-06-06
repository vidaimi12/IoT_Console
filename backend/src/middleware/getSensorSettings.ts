import SettingsSchema from "../models/SensorSettings";
import { CallbackError, Document } from "mongoose";
import express, {
    Request,
    Response
} from "express"

function getSensorSettings(req: Request, res: Response) {
    console.log(req.body);
    var result: any[] = new Array(0);
    const datas = SettingsSchema.find({ sensorName: req.params.sensorName }).exec();
    datas.then(function (data) {
        res.json(JSON.stringify(data));
        res.status(200).end();
        console.log(JSON.stringify(data));
    });

}
export default getSensorSettings;
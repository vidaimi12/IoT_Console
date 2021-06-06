import Data from "../models/Data";
import SettingsSchema from "../models/SensorSettings";
import { CallbackError, Document } from "mongoose";
import express, {
    Request,
    Response
} from "express"

var updateint = "1";

async function recordData(req: Request, res: Response) {
    console.log(req.body);
    var ret = await Data.create(new Data({
        sensorName: req.body?.sensorName,
        user: req.body?.user,
        value: req.body?.value,
        date: Date()
    }), (err: CallbackError, data: any) => {
        const datas = SettingsSchema.find({ sensorName: data.sensorName }).exec();
        datas.then(function (data2: any[1]) {
            if(data2[0]!=undefined)
            {
                updateint=data2[0].updateIntervall;
                console.log();
            }
        });
        console.log("Data recorded: " + data.sensorName + " " + data.user + " " + data.value + " " + data.date);
       console.log(err);
    });
    console.log('Query:' + ret);
    res.status(200);
    res.send(updateint).end();
}
export default recordData;
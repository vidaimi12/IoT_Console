import SensorSettings from "../models/SensorSettings";
import { CallbackError, Document } from "mongoose";
import SettingsSchema from "../models/SensorSettings";
import express, {
    Request,
    Response
} from "express"

function setSensorSettings(req: Request, res: Response) {
    console.log(req.body);

    const datas = SettingsSchema.find({ sensorName: req.params.sensorName, user: req.body.user}).exec();
    datas.then(function (data) {
        console.log(JSON.stringify(data));
        
            const datas = SettingsSchema.findOneAndUpdate({ sensorName: req.body.sensorName, user: req.body.user},{ updateIntervall: req.body.updateIntervall}, {
                new: true, upsert: true } ).exec(); //new - visszatér az új bejegyzés adataival | upsert - ha nincs ilyen, akkor létrehozza a filter adataival + az update rész adataival
            datas.then(function (data) {
                console.log(data);
            });
            console.log(datas);
    });

    
    res.status(200);
    res.send({}).end();
}
export default setSensorSettings; 
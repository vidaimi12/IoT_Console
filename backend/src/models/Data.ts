import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    sensorName: String,
    user: String,
    value: String,
    date: Date
});

const DataModel = mongoose.model('Data', DataSchema, 'values');

export default DataModel;
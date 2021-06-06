import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
    sensorName: String,
    user: String,
    updateIntervall: String,
});

const DataModel = mongoose.model('Settings', SettingsSchema, 'settings');
const findandmodify = mongoose.set('useFindAndModify', false);

export default DataModel;
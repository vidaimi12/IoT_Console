import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    password: {
        type: String,
        select: true
    }
});

const userModel = mongoose.model('User', userSchema, 'users');

export default userModel;

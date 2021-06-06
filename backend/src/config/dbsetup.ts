import mongoose from "mongoose"

mongoose.connect((process.env as any).DB_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database.");
}).catch(console.error);

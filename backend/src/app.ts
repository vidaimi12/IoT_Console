import "./config";
import express from "express";
import path from "path";
import routes from "./routes";
import logger from "morgan";
import User from "./models/User";
import cors from "cors";




const app = express()

app.disable("x-powered-By")

// Then pass these options to cors:
app.use(cors());

app.use(logger((process.env as any).LOGGER))
app.use(express.json())


app.use(routes)
app.use(express.static(path.join(__dirname, "..", "public")))

//app.listen(8080, '0.0.0.0');

 app.listen(process.env.PORT, () => {
     console.log(`Server running http://localhost:${process.env.PORT}`)
 });
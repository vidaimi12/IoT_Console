import express, {
    Request,
    Response,
    NextFunction
} from "express"
import sendPageMW from "./middleware/sendPage"
import sendLoginMW from "./middleware/login"
import recordData from "./middleware/recordData"
import createUser from "./middleware/createUser"
import getSensorData from "./middleware/getSensorData"
import sendUserFromToken from "./middleware/userData"
import publicResponse from "./middleware/publicResponse"
import getSensorValues from "./middleware/getSensorValues"
import setSensorSettings from "./middleware/setSensorSettings"
import getSensorSettings from "./middleware/getSensorSettings"

const router = express.Router();

router.get("/", sendPageMW);

router.post("/login", sendLoginMW);
router.get("/user", sendUserFromToken);
router.get("/public", publicResponse);
router.post("/createUser", createUser);
router.post("/recordData", recordData)
router.post("/getSensorData", getSensorData)
router.get("/getSensorValues/:sensorName", getSensorValues);
router.post("/setSensorSettings", setSensorSettings)
router.get("/getSensorSettings/:sensorName", getSensorSettings)

export default router;

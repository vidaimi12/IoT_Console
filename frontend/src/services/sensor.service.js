import axios from "axios";
import sensorHeader from "./sensor-header";

const API_URL = "http://localhost:8080/";

class SensorService {

  static setSensorUpdateInterval(sensorname, userid, interval) {
    return axios.post(API_URL + "setSensorSettings", { "sensorName": sensorname,
                                                            "user": userid,
                                                            "updateIntervall": interval
    });
  }

  static getSensorsBoard(userid) {
    console.log(userid);
    return axios.post(API_URL + "getSensorData", { headers: sensorHeader(), userID: userid });
  }
  static getSensorsValues(sensorName) {
    return axios.get(API_URL + "getSensorValues/" + sensorName);
  }

  static getSensorSettings(sensorName){
    return axios.get(API_URL + "getSensorSettings/" + sensorName);
  }

  static setSensorSettings(sensorName,user,value){
    return axios.get(API_URL + "getSensorSettings/", {"sensorName":sensorName, "user":user, "updateIntervall":value});
  }

}
export default SensorService;

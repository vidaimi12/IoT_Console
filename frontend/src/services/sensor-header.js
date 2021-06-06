export default function sensorHeader() {
  const sensor = JSON.parse(localStorage.getItem("sensorName"));

  if (sensor && sensor.sensorName) {
    return { "sensorName": sensor.sensorName };
  } else {
    return {};
  }
}

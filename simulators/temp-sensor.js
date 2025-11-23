import { GenericSensor } from "./generic-sensor.js";

class TempSensor extends GenericSensor {
  generatePayload() {
    const temp = 19 + Math.random() * 7;
    return { temperature: parseFloat(temp.toFixed(2)) };
  }
}

const sensor = new TempSensor({
  deviceId: "temp01",
  intervalMs: 3000
});

sensor.start();
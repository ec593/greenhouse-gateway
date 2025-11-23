import { GenericSensor } from "./generic-sensor.js";

class HumiditySensor extends GenericSensor {
    generatePayload() {
        const humidity = 39 + Math.random() * 22;
        return { humidity: parseFloat(humidity.toFixed(1)) };
    }
}

const sensor = new HumiditySensor({
    deviceId: "humidity01",
    intervalMs: 4000
});

sensor.start();
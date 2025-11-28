
const GATEWAY_URL = "http://localhost:3000";
const TOKEN = process.env.DEVICE_TOKEN;
const SECRET = process.env.INTERNAL_SECRET;

export class GenericSensor {

    constructor({ deviceId, intervalMs = 5000 }) {
        this.deviceId = deviceId;
        this.intervalMs = intervalMs;
        this.timer = null;
    }

    generatePayload() {
        return {};
    }

    async send() {
        const payload = {
            deviceId: this.deviceId,
            timestamp: Date.now(),
            ...this.generatePayload()
        };

        try {
            const response = await fetch(`${GATEWAY_URL}/data`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                           "Authorization": `Bearer ${TOKEN}`,
                           "x-internal-secret": SECRET },
                body: JSON.stringify(payload)
            });

            const resJson = await response.json();
            console.log(`[${this.deviceId}] Sent →`, payload, "\nReceived:", resJson);
        } catch (err) {
            console.error(`[${this.deviceId}] Error sending data:`, err.message);
        }
    }

    start() {
        console.log(`[${this.deviceId}] device simulator started`);
        this.send();
        this.timer = setInterval(() => this.send(), this.intervalMs);
    }

    stop() {
        clearInterval(this.timer);
        console.log(`[${this.deviceId}] device simulator stopped`);
    }
}
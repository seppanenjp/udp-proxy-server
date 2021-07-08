"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const NAVISPORT_HOST = "navisport.fi";
class NavisportClient {
    savePassing(payload, deviceId) {
        const data = JSON.stringify(Object.assign({}, payload, { deviceId: payload.deviceId || deviceId }));
        const options = {
            hostname: NAVISPORT_HOST,
            path: "/api/devices/data",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length,
            },
        };
        const request = https.request(options, (res) => {
            console.log(`data statusCode: ${res.statusCode}`);
            res.on("data", (d) => {
                process.stdout.write(d);
            });
        });
        request.on("error", (error) => {
            console.error(error);
        });
        request.write(data);
        request.end();
    }
    ping(deviceId) {
        const options = {
            hostname: NAVISPORT_HOST,
            path: `/api/devices/${deviceId}/ping`,
            method: "GET",
        };
        const request = https.request(options, (res) => {
            console.log(`ping statusCode: ${res.statusCode}`);
            res.on("data", (d) => {
                process.stdout.write(d);
            });
        });
        request.on("error", (error) => {
            console.error(error);
        });
        request.end();
    }
}
exports.NavisportClient = NavisportClient;

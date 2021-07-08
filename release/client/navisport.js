"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const NAVISPORT_HOST = "https://navisport.fi/api";
class NavisportClient {
    savePassing(payload, deviceId) {
        const data = JSON.stringify(Object.assign({}, payload, { deviceId }));
        const options = {
            hostname: NAVISPORT_HOST,
            path: "/devices/data",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length,
            },
        };
        https.request(options);
    }
    ping(deviceId) {
        const options = {
            hostname: NAVISPORT_HOST,
            path: `/devices/${deviceId}/ping`,
            method: "GET",
        };
        https.request(options);
    }
}
exports.NavisportClient = NavisportClient;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../utils/parser");
const https = require("https");
const index_1 = require("../index");
const NAVISPORT_HOST = "navisport.fi";
class NavisportClient {
    savePassing(msg, remote) {
        const data = JSON.stringify(Object.assign({}, msg.payload, { deviceId: msg.payload.deviceId || msg.deviceId }));
        const options = {
            hostname: NAVISPORT_HOST,
            path: "/api/devices/data",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length,
            },
        };
        const request = https.request(options, () => index_1.sendResponse(remote, {
            packageId: msg.packageId,
            type: parser_1.MessageType.Acknowledgment,
        }));
        request.on("error", (error) => console.log("Unable to send passings", error));
        request.write(data);
        request.end();
    }
    ping(deviceId, remote) {
        const options = {
            hostname: NAVISPORT_HOST,
            path: `/api/devices/${deviceId}/ping`,
            method: "GET",
        };
        const request = https.request(options, () => index_1.sendResponse(remote, {
            deviceId: "Navisport-UDP",
            type: parser_1.MessageType.Ping,
        }));
        request.on("error", (error) => console.log("Unable to ping", error));
        request.end();
    }
}
exports.NavisportClient = NavisportClient;

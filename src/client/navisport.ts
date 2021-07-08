import { Passing } from "../utils/parser";
import * as https from "https";
import * as http from "http";

const NAVISPORT_HOST = "navisport.fi";

export class NavisportClient {
  savePassing(payload: Passing, deviceId: string): void {
    const data = JSON.stringify({
      ...payload,
      deviceId: payload.deviceId || deviceId,
    });
    const options = {
      hostname: NAVISPORT_HOST,
      path: "/api/devices/data",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };
    const request = http.request(options);
    request.write(data);
    request.end();
  }

  ping(deviceId: string): void {
    const options = {
      hostname: NAVISPORT_HOST,
      path: `/api/devices/${deviceId}/ping`,
      method: "GET",
    };
    const request = https.request(options);
    request.end();
  }
}

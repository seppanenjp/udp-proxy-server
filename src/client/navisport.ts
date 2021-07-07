import { Passing } from "../utils/parser";
import * as https from "https";

const NAVISPORT_HOST = "https://navisport.fi/api";

export class NavisportClient {
  savePassing(payload: Passing): void {
    const data = JSON.stringify(payload);
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

  ping(deviceId: string): void {
    const options = {
      hostname: NAVISPORT_HOST,
      path: `/devices/${deviceId}/ping`,
      method: "GET",
    };
    https.request(options);
  }
}

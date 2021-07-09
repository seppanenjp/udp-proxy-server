import { Message, MessageType } from "../utils/parser";
import * as https from "https";
import { sendResponse } from "../index";
import * as dgram from "dgram";

const NAVISPORT_HOST = "navisport.fi";

export class NavisportClient {
  savePassing(msg: Message, remote: dgram.RemoteInfo): void {
    const data = JSON.stringify({
      ...msg.payload,
      deviceId: msg.payload.deviceId || msg.deviceId,
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
    const request = https.request(options, () =>
      sendResponse(remote, {
        packageId: msg.packageId,
        type: MessageType.Acknowledgment,
      })
    );
    request.on("error", (error) =>
      console.log("Unable to send passings", error)
    );
    request.write(data);
    request.end();
  }

  ping(deviceId: string, remote: dgram.RemoteInfo): void {
    const options = {
      hostname: NAVISPORT_HOST,
      path: `/api/devices/${deviceId}/ping`,
      method: "GET",
    };
    const request = https.request(options, () =>
      sendResponse(remote, {
        deviceId: "Navisport-UDP",
        type: MessageType.Ping,
      })
    );
    request.on("error", (error) => console.log("Unable to ping", error));
    request.end();
  }
}

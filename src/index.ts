import { NavisportClient } from "./client/navisport";
import { Message, MessageType, parseMessage } from "./utils/parser";
import dgram = require("dgram");

const server = dgram.createSocket("udp4");
const port = 15949; // Default port

export enum SocketEvent {
  Message = "message",
  Listening = "listening",
}

const naviClient = new NavisportClient();

server.on(SocketEvent.Listening, () =>
  console.log(`UDP Server listening on port: ${server.address().port}`)
);

server.bind(port);

server.on(SocketEvent.Message, (data: string, remote: dgram.RemoteInfo) => {
  try {
    parseMessage(data).forEach((msg: Message) => {
      switch (msg.type) {
        case MessageType.Passing:
        case MessageType.PostPassing:
          naviClient.savePassing(msg, remote);
          break;
        case MessageType.Ping:
          if (Array.isArray(msg.deviceId)) {
            msg.deviceId.forEach((id: string) => {
              naviClient.ping(id, remote);
            });
          } else {
            naviClient.ping(msg.deviceId, remote);
          }
          break;
        default:
          console.log("Unknown package type!");
      }
    });
  } catch (e) {
    console.log("Unable to parse data message", e);
  }
});

export const sendResponse = (remote: dgram.RemoteInfo, data: Object): void => {
  const msg = Buffer.from(JSON.stringify(data));
  server.send(msg, 0, msg.length, remote.port, remote.address);
};

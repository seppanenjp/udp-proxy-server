import { NavisportClient } from "./client/navisport";
import { Message, MessageType, parseMessage } from "./utils/parser";
import dgram = require("dgram");

const server = dgram.createSocket("udp4");
const port = 15949;

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
          naviClient.savePassing(msg.payload, msg.deviceId as string);
          break;
        case MessageType.Ping:
          if (Array.isArray(msg.deviceId)) {
            msg.deviceId.forEach((id: string) => {
              naviClient.ping(id);
            });
          } else {
            naviClient.ping(msg.deviceId);
          }
          sendResponse(remote, {
            deviceId: "Navisport-UDP",
            type: MessageType.Ping,
          });
          break;
      }
      if (msg.packageId) {
        sendResponse(remote, {
          packageId: msg.packageId,
          type: MessageType.Acknowledgment,
        });
      }
    });
  } catch (e) {
    // Be happy and continue :)
  }
});

const sendResponse = (remote: dgram.RemoteInfo, data: Object): void => {
  const msg = Buffer.from(JSON.stringify(data));
  server.send(msg, 0, msg.length, remote.port, remote.address);
};

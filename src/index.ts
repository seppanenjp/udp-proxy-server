import { NavisportClient } from "./client/navisport";
import dgram = require("dgram");
import { AddressInfo } from "net";
import { Message, MessageType, parseMessage } from "./utils/parser";
import { config } from "dotenv";

const server = dgram.createSocket("udp4");
const port = 60709;

config();

export enum SocketEvent {
  Message = "message",
  Listening = "listening",
}

const naviClient = new NavisportClient();

server.on(SocketEvent.Listening, () => {
  const addressInfo: AddressInfo = server.address();
  console.log(
    `UDP Server listening on ${addressInfo.address} : ${addressInfo.port}`
  );
});

server.bind(port);

server.on(SocketEvent.Message, (data: string, remote: dgram.RemoteInfo) => {
  try {
    parseMessage(data).forEach(async (msg: Message) => {
      switch (msg.type) {
        case MessageType.Passing:
          await naviClient.savePassing(msg.payload);
          break;
      }
      sendResponse(remote.address, remote.port, Buffer.from(msg.packageId));
    });
  } catch (e) {
    // Be happy and continue :)
  }
});

const sendResponse = (host: string, port: number, msg: Buffer): void =>
  server.send(msg, 0, msg.length, port, host);

// -------------------- UDP test client ----------------

const client = dgram.createSocket("udp4");

client.on(SocketEvent.Message, (msg: Buffer) =>
  console.log(`Data received from server : ${msg.toString()}`)
);

// packageId is nanoid, uuid or something else
// https://www.npmjs.com/package/nanoid
const data1 = Buffer.from(
  JSON.stringify({
    packageId: "package1",
    type: "Passing",
    payload: {
      deviceId: "12412",
      chip: "205275",
      timestamp: "2020-01-01T10:00:00Z",
    },
  } as Message)
);

//possible to send multiple messages
client.send([data1], port, "localhost", () => {});

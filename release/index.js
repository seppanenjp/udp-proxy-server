"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navisport_1 = require("./client/navisport");
const parser_1 = require("./utils/parser");
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const port = 15949; // Default port
var SocketEvent;
(function (SocketEvent) {
    SocketEvent["Message"] = "message";
    SocketEvent["Listening"] = "listening";
})(SocketEvent = exports.SocketEvent || (exports.SocketEvent = {}));
const naviClient = new navisport_1.NavisportClient();
server.on(SocketEvent.Listening, () => console.log(`UDP Server listening on port: ${server.address().port}`));
server.bind(port);
server.on(SocketEvent.Message, (data, remote) => {
    try {
        parser_1.parseMessage(data).forEach((msg) => {
            switch (msg.type) {
                case parser_1.MessageType.Passing:
                case parser_1.MessageType.PostPassing:
                    naviClient.savePassing(msg, remote);
                    break;
                case parser_1.MessageType.Ping:
                    if (Array.isArray(msg.deviceId)) {
                        msg.deviceId.forEach((id) => {
                            naviClient.ping(id, remote);
                        });
                    }
                    else {
                        naviClient.ping(msg.deviceId, remote);
                    }
                    break;
                default:
                    console.log("Unknown package type!");
            }
        });
    }
    catch (e) {
        console.log("Unable to parse data message", e);
    }
});
exports.sendResponse = (remote, data) => {
    const msg = Buffer.from(JSON.stringify(data));
    server.send(msg, 0, msg.length, remote.port, remote.address);
};

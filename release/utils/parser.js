"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType["Passing"] = "Passing";
    MessageType["PostPassing"] = "PostPassing";
    MessageType["Ping"] = "Ping";
    MessageType["Acknowledgment"] = "Acknowledgment";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class Passing {
}
exports.Passing = Passing;
exports.parseMessage = (msg) => JSON.parse(`[${msg.toString()}]`.replace(/}{/g, "},{"));

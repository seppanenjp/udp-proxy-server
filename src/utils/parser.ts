export enum MessageType {
  Passing = "Passing",
  PostPassing = "PostPassing",
  Ping = "Ping",
}

export interface Message {
  packageId: string;
  deviceId: string;
  payload: Passing;
  type: MessageType;
}

export class Passing {
  deviceId: string;
  chip: string;
  timestamp: string; // Date;
}

export const parseMessage = (msg: string): Message[] =>
  JSON.parse(`[${msg.toString()}]`.replace(/}{/g, "},{"));

import WebSocket, { WebSocketServer } from "ws";
import { ProtocolFactory, WebSocketHandler } from "../index"; // Update with your actual module path
import {describe, expect, test, jest, beforeEach} from "@jest/globals";
import { TEST_PORT } from "../config";
jest.mock("ws");

describe("ProtocolFactory", () => {
  test("creates a WebSocketHandler for the websocket protocol", () => {
    const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
    const handler = ProtocolFactory.createHandler("websocket", ws);
    expect(handler).toBeInstanceOf(WebSocketHandler);
  });

  test("throws an error for unsupported protocols", () => {
    const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
    expect(() => ProtocolFactory.createHandler("unsupported", ws)).toThrow(
      "Unsupported protocol: unsupported"
    );
  });
});

describe("WebSocketHandler", () => {
  test("handleMessage sends data to the client", () => {
    const ws = new WebSocket(`ws://localhost:${TEST_PORT}`);
    const handler = new WebSocketHandler(ws);
    const client = new WebSocket(`ws://localhost:${TEST_PORT}`);
    client.send = jest.fn();

    handler.handleMessage("test data", client);

    expect(client.send).toHaveBeenCalledWith("test data");
  });
});
import type { IncomingMessage, ServerResponse } from "node:http";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const url = req.url ?? "";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }

  if (url.endsWith("/healthz")) {
    res.writeHead(200).end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(404).end(JSON.stringify({ error: "Not found" }));
}

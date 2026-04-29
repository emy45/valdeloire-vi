import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";

const app = new Hono();

// Enable CORS for all routes
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint - uses different path to avoid conflicts
app.get("/server/health", (c) => {
  return c.json({ status: "ok", message: "Server function is running" });
});

// Root endpoint
app.get("/", (c) => {
  return c.json({ 
    message: "VAL DE LOIRE V.I Server Function", 
    status: "active",
    note: "Main API endpoints are served by make-server-45b957fb function"
  });
});

Deno.serve(app.fetch);

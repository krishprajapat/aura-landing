import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { createPaymentIntent, handleWebhook } from "./routes/stripe";

export function createServer() {
  const app = express();

  // Configure CORS to allow all origins in development
  app.use(cors({
    origin: true,
    credentials: true
  }));

  // Stripe webhook needs raw body
  app.use('/api/webhook', express.raw({ type: 'application/json' }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Stripe routes
  app.post("/api/create-payment-intent", createPaymentIntent);
  app.post("/api/webhook", handleWebhook);

  return app;
}
import express from "express";
import { verifyJWT } from "./auth.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const SECRET = process.env.INTERNAL_SECRET;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.post("/data", verifyJWT, async (req, res) => {
  try {
    console.log("Authenticated user:", req.user);
    const response = await fetch("http://localhost:3001/data", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "x-internal-secret": SECRET },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Gateway to ingest error:", err);
    res.status(502).json({ error: "Bad gateway", details: err.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3003/register", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "x-internal-secret": SECRET },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Gateway to auth error:", err);
    res.status(502).json({ error: "Bad gateway", details: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3003/login", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "x-internal-secret": SECRET },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Gateway to auth error:", err);
    res.status(502).json({ error: "Bad gateway", details: err.message });
  }
});

app.listen(3000, () => console.log("Gateway listening on 3000"));
import express from "express";

const app = express();
app.use(express.json());

app.post("/data", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3001/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Gateway to ingest error:", err);
    res.status(502).json({ error: "Bad gateway", details: err.message });
  }
});

app.listen(3000, () => console.log("Gateway listening on 3000"));
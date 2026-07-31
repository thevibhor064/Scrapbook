import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK if GEMINI_API_KEY is available
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Endpoint for generating/polishing romantic notes for Aruu
app.post("/api/gemini/romantic-note", async (req, res) => {
  try {
    const { prompt, vibe = "romantic & sweet", name = "Aruu" } = req.body;
    
    if (!process.env.GEMINI_API_KEY || !ai) {
      // Fallback response if no API key is set
      return res.json({
        note: `My dearest ${name}, every moment with you feels like a beautiful dream come true. Happy Girlfriend's Day! 💕✨`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Write a classy, beautiful, deeply romantic note for my girlfriend named ${name}. 
Tone/Style: ${vibe}. Avoid dramatic or cringe clichés; keep it sophisticated, warm, genuine, and touching. Use a few tasteful heart and sparkle emojis (💕, ✨, 🌸).
User context/prompt: ${prompt || "A note expressing how grateful I am to have her in my life on Girlfriend's Day."}`,
      config: {
        temperature: 0.8,
      },
    });

    res.json({ note: response.text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({
      error: "Failed to generate romantic note",
      fallback: "My dearest Aruu, you make every ordinary day extraordinary. Happy Girlfriend's Day! 💕✨",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

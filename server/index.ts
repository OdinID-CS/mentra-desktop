import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import geminiService from './geminiService';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/ai/ask', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const response = await geminiService.generateText(prompt);
      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "AI Generation failed" });
    }
  });

  app.post('/api/ai/flashcards', async (req, res) => {
    const { notes } = req.body;
    if (!notes) {
      return res.status(400).json({ error: "Notes are required" });
    }

    try {
      const prompt = `Convert these notes into a JSON array of flashcards with 'question' and 'answer' fields: ${notes}`;
      const cards = await geminiService.generateJSON(prompt);
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate flashcards" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

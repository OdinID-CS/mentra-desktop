import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import geminiService from './geminiService';
import { authService } from './auth';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Auth Routes
  app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authService.register(email, password);
      res.json({ success: true, user });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authService.login(email, password);
      res.json({ success: true, user });
    } catch (error) {
      res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
    }
  });

  // AI Routes
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

  app.post('/api/ai/explain', async (req, res) => {
    const { assignment } = req.body;
    if (!assignment) {
      return res.status(400).json({ error: "Assignment is required" });
    }

    try {
      const prompt = `Explain this assignment step-by-step: ${assignment}`;
      const explanation = await geminiService.generateText(prompt);
      res.json({ explanation });
    } catch (error) {
      res.status(500).json({ error: "Failed to explain assignment" });
    }
  });

  app.post('/api/ai/knowledge', async (req, res) => {
    const { notes } = req.body;
    if (!notes) {
      return res.status(400).json({ error: "Notes are required" });
    }

    try {
      const prompt = `Convert these unstructured notes into a highly organized knowledge structure with summary, key concepts, and hierarchy: ${notes}`;
      const knowledge = await geminiService.generateJSON(prompt);
      res.json(knowledge);
    } catch (error) {
      res.status(500).json({ error: "Failed to extract knowledge" });
    }
  });

  app.post('/api/ai/planner', async (req, res) => {
    const { topic, timeframe } = req.body;
    if (!topic || !timeframe) {
      return res.status(400).json({ error: "Topic and timeframe are required" });
    }

    try {
      const prompt = `Create a detailed study plan for ${topic} over ${timeframe}. Return a JSON object with 'title' and 'phases' (each phase has 'name', 'tasks' array, and 'duration'): ${topic}`;
      const plan = await geminiService.generateJSON(prompt);
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate study plan" });
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

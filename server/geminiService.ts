import { GoogleGenerativeAI, GenerationConfig, SafetySetting } from "@google/generative-ai";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

/**
 * GeminiService handles interactions with the Google Generative AI API.
 */
class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Defaulting to gemini-1.5-flash for speed and efficiency
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  /**
   * Sends a prompt to the Gemini model and returns the text response.
   * @param prompt The string prompt to send to the AI.
   * @param config Optional generation configuration.
   * @returns Promise<string> The AI generated text.
   */
  async generateText(prompt: string, config?: GenerationConfig): Promise<string> {
    try {
      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: config || {
          maxOutputTokens: 2048,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });

      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error("Empty response from Gemini API");
      }

      return text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
      }
      throw new Error("An unknown error occurred during AI generation");
    }
  }

  /**
   * Generates structured JSON data from a prompt.
   * @param prompt The prompt instructing the AI to return JSON.
   * @returns Promise<any> The parsed JSON object.
   */
  async generateJSON(prompt: string): Promise<any> {
    try {
      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini JSON Generation Error:", error);
      throw error;
    }
  }
}

// Export a singleton instance
const geminiService = new GeminiService();
export default geminiService;

// Reusable function as requested
export const askGemini = (prompt: string) => geminiService.generateText(prompt);

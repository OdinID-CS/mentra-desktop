import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Flashcard {
  question: string;
  answer: string;
}

export const generateFlashcards = async (notes: string): Promise<Flashcard[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a list of flashcards from the following notes. Return the result as a JSON array of objects with 'question' and 'answer' fields.
      
      Notes:
      ${notes}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING },
            },
            required: ["question", "answer"],
          },
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw error;
  }
};

export const explainAssignment = async (assignment: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Explain the following assignment in simple terms and provide a step-by-step guide on how to approach it.
      
      Assignment:
      ${assignment}`,
      config: {
        systemInstruction: "You are a helpful study assistant. Your goal is to make complex assignments easy to understand.",
      },
    });

    return response.text || "Sorry, I couldn't generate an explanation.";
  } catch (error) {
    console.error("Error explaining assignment:", error);
    throw error;
  }
};

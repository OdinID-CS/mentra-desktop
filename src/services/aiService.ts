import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Flashcard {
  question: string;
  answer: string;
}

export const generateFlashcards = async (notes: string): Promise<Flashcard[]> => {
  if (!notes || notes.trim().length < 10) {
    throw new Error("Lecture notes are too short to generate meaningful flashcards.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Mentra, a structured learning system. 
      Convert the following lecture notes into clear, exam-style flashcards. 
      
      Requirements:
      1. Focus on active recall and key concepts.
      2. Keep answers concise (ideally one sentence or a short list).
      3. Ensure questions are specific and unambiguous.
      
      Return ONLY a JSON array of objects with 'question' and 'answer' fields.
      
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

    const text = response.text;
    if (!text) throw new Error("AI failed to generate flashcard content.");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse AI response. Please try again.");
    }
    throw error;
  }
};

export interface StudyPlan {
  title: string;
  phases: {
    name: string;
    tasks: string[];
    duration: string;
  }[];
}

export const generateStudyPlan = async (topic: string, timeframe: string): Promise<StudyPlan> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Mentra, a structured learning system. Create a detailed study plan for the following topic over the specified timeframe.
      Break it down into logical phases with specific tasks.
      Return ONLY a JSON object matching the StudyPlan schema.
      
      Topic: ${topic}
      Timeframe: ${timeframe}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                  duration: { type: Type.STRING },
                },
                required: ["name", "tasks", "duration"],
              },
            },
          },
          required: ["title", "phases"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating study plan:", error);
    throw error;
  }
};

export interface StructuredKnowledge {
  summary: string;
  keyConcepts: { term: string; definition: string }[];
  hierarchy: { level: string; content: string }[];
}

export const extractKnowledge = async (notes: string): Promise<StructuredKnowledge> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Mentra, a structured learning system. Convert these unstructured notes into a highly organized knowledge structure.
      Include a summary, key concepts, and a logical hierarchy.
      Return ONLY a JSON object matching the StructuredKnowledge schema.
      
      Notes:
      ${notes}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyConcepts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  definition: { type: Type.STRING },
                },
                required: ["term", "definition"],
              },
            },
            hierarchy: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING },
                  content: { type: Type.STRING },
                },
                required: ["level", "content"],
              },
            },
          },
          required: ["summary", "keyConcepts", "hierarchy"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error extracting knowledge:", error);
    throw error;
  }
};

export const explainAssignment = async (assignment: string): Promise<string> => {
  if (!assignment || assignment.trim().length < 5) {
    throw new Error("Assignment prompt is too short to explain.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `You are Mentra, a structured learning system. Explain the following assignment.
      
      Requirements:
      1. Provide a **Simple Explanation** of what the assignment is asking for (student-friendly tone).
      2. Provide a **Step-by-Step Breakdown** of how to complete it.
      3. Provide a **Concrete Example** if applicable to clarify the task.
      
      Do NOT use conversational filler (e.g., "Sure, I can help with that").
      Use Markdown with clear headers for each section.
      
      Assignment:
      ${assignment}`,
      config: {
        systemInstruction: "You are Mentra, a structured learning system. Your output is data-driven, logical, and student-friendly. You avoid conversational filler and focus on clarity and structure.",
      },
    });

    return response.text || "No structured explanation generated.";
  } catch (error) {
    console.error("Error explaining assignment:", error);
    throw error;
  }
};

export const chat = async (message: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = []): Promise<string> => {
  try {
    const chatSession = ai.chats.create({
      model: "gemini-3.1-pro-preview",
      history,
    });

    const result = await chatSession.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

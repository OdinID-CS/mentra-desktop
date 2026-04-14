/**
 * BackendService handles communication with the local Node.js server.
 */
export class BackendService {
  private static baseUrl = "/api";

  /**
   * Generates flashcards from notes via the backend.
   */
  static async generateFlashcards(notes: string) {
    const response = await fetch(`${this.baseUrl}/ai/flashcards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate flashcards");
    }

    return response.json();
  }

  /**
   * Explains an assignment via the backend.
   */
  static async explainAssignment(assignment: string) {
    const response = await fetch(`${this.baseUrl}/ai/explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignment }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to explain assignment");
    }

    const data = await response.json();
    return data.explanation;
  }

  /**
   * Extracts structured knowledge from notes via the backend.
   */
  static async extractKnowledge(notes: string) {
    const response = await fetch(`${this.baseUrl}/ai/knowledge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to extract knowledge");
    }

    return response.json();
  }

  /**
   * Generates a study plan via the backend.
   */
  static async generateStudyPlan(topic: string, timeframe: string) {
    const response = await fetch(`${this.baseUrl}/ai/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, timeframe }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate study plan");
    }

    return response.json();
  }

  /**
   * General AI query via the backend.
   */
  static async askAI(prompt: string) {
    const response = await fetch(`${this.baseUrl}/ai/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "AI query failed");
    }

    const data = await response.json();
    return data.response;
  }
}

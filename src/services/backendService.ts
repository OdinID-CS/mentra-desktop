import * as aiService from "./aiService";
import { supabase } from "@/lib/supabase";

/**
 * BackendService handles communication with the local Node.js server.
 * Now integrated with real AI services and Supabase.
 */
export class BackendService {
  private static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Registers a new user via Supabase.
   */
  static async register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Logs in a user via Supabase.
   */
  static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Logs out the current user.
   */
  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  /**
   * Generates flashcards from notes via the backend.
   */
  static async generateFlashcards(notes: string) {
    return await aiService.generateFlashcards(notes);
  }

  /**
   * Explains an assignment via the backend.
   */
  static async explainAssignment(assignment: string) {
    return await aiService.explainAssignment(assignment);
  }

  /**
   * Extracts structured knowledge from notes via the backend.
   */
  static async extractKnowledge(notes: string) {
    return await aiService.extractKnowledge(notes);
  }

  /**
   * Generates a study plan via the backend.
   */
  static async generateStudyPlan(topic: string, timeframe: string) {
    return await aiService.generateStudyPlan(topic, timeframe);
  }

  /**
   * General AI query via the backend.
   */
  static async askAI(prompt: string) {
    return await aiService.chat(prompt);
  }
}

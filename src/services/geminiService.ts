import { GoogleGenAI } from "@google/genai";
import { Scheme } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  income: number;
  occupation: string;
  location: string;
  category: string;
  specialConditions: string[];
}

export interface EligibilityResult {
  schemeId: string;
  status: 'Eligible' | 'Partially Eligible' | 'Not Eligible';
  reason: string;
  score: number; // 0-100
  benefitValue: string;
  easeOfApproval: string; // "Easy", "Medium", "Hard"
  speed: string; // "Fast", "Medium", "Slow"
}

export async function checkEligibility(profile: UserProfile, schemes: Scheme[]): Promise<EligibilityResult[]> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    You are an expert Government Scheme Eligibility Engine for India and Karnataka.
    Compare the following user profile with the list of provided schemes.
    
    User Profile:
    ${JSON.stringify(profile, null, 2)}
    
    Schemes:
    ${JSON.stringify(schemes, null, 2)}
    
    Output a JSON array of eligibility results. For each scheme, provide:
    - schemeId: string
    - status: "Eligible" | "Partially Eligible" | "Not Eligible"
    - reason: A short explanation (max 2 sentences) of why they qualify or don't.
    - score: A match score from 0 to 100 based on eligibility and benefit relevance.
    - benefitValue: High, Medium, or Low.
    - easeOfApproval: Easy, Medium, or Hard.
    - speed: Fast, Medium, or Slow.
    
    Strictly output ONLY valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const results = JSON.parse(response.text || "[]");
    return results;
  } catch (error) {
    console.error("Eligibility reasoning failed:", error);
    // Simple fallback logic if AI fails
    return schemes.map(scheme => ({
      schemeId: scheme.id,
      status: 'Partially Eligible',
      reason: "Manual review recommended.",
      score: 50,
      benefitValue: 'Medium',
      easeOfApproval: 'Medium',
      speed: 'Medium'
    }));
  }
}

export async function getChatResponse(history: {role: 'user' | 'model', content: string}[], message: string, profile?: UserProfile) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are YOJANA AI, a helpful Indian government scheme assistant.
    Current User Profile: ${profile ? JSON.stringify(profile) : "Not provided yet"}.
    Your goal is to:
    1. Collect missing user information (Age, Income, Occupation, etc.) conversationally if not provided.
    2. Answer questions about specific schemes.
    3. Be truthful, official, yet approachable.
    4. Speak in English (primarily), but support Kannada and Hindi if the user speaks them.
    5. Always mention "The eligibility results are AI-generated and should be verified on official portals".
  `;

  try {
    const contents = history.map(h => ({
      role: h.role,
      parts: [{ text: h.content }]
    }));
    
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction
      }
    });

    return response.text;
  } catch (error) {
    console.error("Chat failure:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
}

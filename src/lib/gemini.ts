import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export const generateAIResponse = async (prompt: string, modelType = "gemini-pro") => {
  try {
    const model = genAI.getGenerativeModel({ model: modelType });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to generate AI content");
  }
};

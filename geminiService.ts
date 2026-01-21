
import { GoogleGenAI, Type } from "@google/genai";
import { SkinAnalysis, RecommendedProduct, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function analyzeSkin(imageData: string, profile: UserProfile): Promise<{ analysis: SkinAnalysis, products: RecommendedProduct[] }> {
  // Extract base64 part
  const base64Data = imageData.split(',')[1];
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Data,
            },
          },
          {
            text: `Analyze this skin photo for a ${profile.age} year old with ${profile.skinType} skin. 
            Provide a detailed skin health analysis and suggest 4 real-world high-quality skincare products (Brand and Product Name) 
            with legitimate external links or search queries for purchase.
            
            Return ONLY a JSON object matching this structure:
            {
              "analysis": {
                "overallScore": number (0-100),
                "hydration": number (0-100),
                "clarity": number (0-100),
                "texture": number (0-100),
                "tone": number (0-100),
                "observations": string[],
                "primaryConcern": string
              },
              "products": [
                {
                  "id": string,
                  "brand": string,
                  "name": string,
                  "category": string,
                  "benefit": string,
                  "buyUrl": string (Must be a direct real URL like Sephora, Ulta, or Amazon)
                }
              ]
            }`,
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text || "";
  return JSON.parse(text);
}


import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Fiscal Mentor", a specialized AI assistant for the Hub B2B platform. 
Your expertise is in Brazilian tax legislation (ICMS, ICMS-ST, IPI, PIS, COFINS, NCM, CEST, MVA).

CURRENT CONTEXT:
The user is working with the "Smirnoff Ice Green Apple" (GTIN: 7893218003986).
This product is a "Bebida Mista Alcoólica Gaseificada".
Data is being synchronized via the "Verified by GS1 R1.2" API.

YOUR ROLE:
1. Help validate if the NCM (2208.90.00) and CEST (03.007.00) are correct for alcoholic mixed drinks in different states (like MG, SP, RJ).
2. Answer questions about the GS1 Manual (OAuth 2.0 authentication, POST/GET methods for Verified by GS1).
3. Provide professional, precise, and helpful advice using Brazilian tax terminology.
4. If referencing laws, mention things like "Anexo XV do RICMS/MG" or "Convênio ICMS 142/18".

Current date: ${new Date().toLocaleDateString()}.
`;

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.API_KEY || '';
    
    if (this.apiKey && this.apiKey !== 'YOUR_API_KEY_HERE') {
      try {
        this.ai = new GoogleGenAI({ apiKey: this.apiKey });
      } catch (error) {
        console.warn('Gemini API initialization failed:', error);
      }
    }
  }

  async sendMessage(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    if (!this.ai) {
      return "⚠️ API Key do Gemini não configurada. Por favor, adicione sua chave no arquivo .env (GEMINI_API_KEY). Obtenha em: https://aistudio.google.com/app/apikey";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      return response.text || "Desculpe, não consegui processar sua solicitação.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Ocorreu um erro na comunicação com o Mentor Fiscal. Por favor, tente novamente.";
    }
  }
}

export const geminiService = new GeminiService();

import { Configuration, OpenAIApi } from "openai";
import { settingsManager } from "./settingsManager";

let openai: OpenAIApi | null = null;

export const askGpt = async (prompt: string) => {
    const [model, apiKey] = await Promise.all([settingsManager.get("model"), settingsManager.get("apiKey")]);

    if (!apiKey) return { completion: null, error: "No API key provided" } as const

    if (!openai) {
        openai = new OpenAIApi(new Configuration({ apiKey }));
    }

    try {
        const completion = await openai.createChatCompletion({
            model, messages: [initialCgtMessage, { role: "user", content: prompt }]
        });
        return { completion: completion.data.choices[0].message?.content, error: null } as const

    } catch (e: any) {
        return { completion: null, error: e.message } as const
    }
}

const initialCgtMessage = {
    role: "system",
    content: "You are an AI assitant called 'QuickGPT'. You must answer all questions in markdown format. If the user asks for code, you must return it in the correct markdown format."
} as const

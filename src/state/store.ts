import { create } from "zustand"

interface QuickGptState {
    input: string;
    setInput: (input: string) => void;

    gptResponse: string;
    setGptResponse: (gptResponse: string) => void;
}

export const useQuickGptStore = create<QuickGptState>((set) => ({
    input: "",
    gptResponse: "",
    setInput: (input) => set({ input }),
    setGptResponse: (gptResponse) => set({ gptResponse }),
}))

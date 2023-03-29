import { create } from "zustand"

interface GptResponseStore {
    error: string | null;
    setError: (error: string | null) => void;

    loadingResponse: boolean;
    setLoadingResponse: (loadingResponse: boolean) => void;

    gptResponse: string;
    setGptResponse: (gptResponse: string) => void;
}

export const useGptResponseStore = create<GptResponseStore>((set) => ({
    gptResponse: "",
    error: null,
    loadingResponse: false,

    setGptResponse: (gptResponse) => set({ gptResponse }),
    setLoadingResponse: (loadingResponse) => set({ loadingResponse }),
    setError: (error) => set({ error }),
}))

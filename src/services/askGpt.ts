import { settingsManager } from "./settingsManager";
import { useGptResponseStore } from "../state/gptResponseStore";

export const askGpt = async (prompt: string) => {
    setLoadingMessageOnState();

    const [model, apiKey] = await Promise.all([settingsManager.get("model"), settingsManager.get("apiKey")]);

    if (!apiKey) return setErrorMessageOnState("No API key provided");

    try {
        const response = await queryOpenAIServer(prompt, { model, apiKey });

        if (!response.ok) return setErrorMessageOnState(`Error ${response.status}: ${response.statusText}`);

        const stream = response.body?.getReader()

        if (!stream) return setErrorMessageOnState("No stream received from OpenAI");

        const decoder = new TextDecoder('utf-8')

        while (true) {
            const { done, value } = await stream.read()

            if (done) break

            const text = decoder.decode(value)
            const data = text.split('\n').filter(Boolean).map((line) => line.trim().replace('data: ', '').trim())

            for (const line of data) {
                if (line === '[DONE]') {
                    useGptResponseStore.setState({ error: null, loadingResponse: false });
                    break
                }

                let content = ''
                try {
                    const json = JSON.parse(line)
                    content = json?.choices[0]?.delta?.content ?? ''
                } catch (e) {
                    console.error('No se pudo parsear la línea', line)
                    console.error(e)
                }

                useGptResponseStore.setState(prev => ({ gptResponse: prev.gptResponse + content }));
            }
        }
    } catch (e: any) {
        if (e?.name === 'AbortError') return;
        setErrorMessageOnState("Error while fetching response from OpenAI");
    }
}


const setErrorMessageOnState = (error: string) => {
    useGptResponseStore.setState({
        error,
        loadingResponse: false,
        gptResponse: ""
    });
}

const setLoadingMessageOnState = () => {
    useGptResponseStore.setState({
        error: null,
        loadingResponse: true,
        gptResponse: ""
    });
}

type OpenAISettings = {
    model: string;
    apiKey: string;
}

let abortController = new AbortController();

const queryOpenAIServer = async (prompt: string, { model, apiKey }: OpenAISettings) => {
    abortController.abort();
    abortController = new AbortController();

    return fetch('https://api.openai.com/v1/chat/completions', {
        signal: abortController.signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model, stream: true, messages: [INITIAL_GPT_MESSAGE, { role: 'user', content: prompt }] })
    })
}

const INITIAL_GPT_MESSAGE = {
    role: "system",
    content: "You are an AI assitant called 'QuickGPT'. You must answer all questions in markdown format. If the user asks for code, you must return it in the correct markdown format."
} as const

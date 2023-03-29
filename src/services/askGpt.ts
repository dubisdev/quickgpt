import { settingsManager } from "./settingsManager";
import { useGptResponseStore } from "../state/gptResponseStore";

export const askGpt = async (prompt: string) => {
    useGptResponseStore.setState({ loadingResponse: true, gptResponse: "" });
    const [model, apiKey] = await Promise.all([settingsManager.get("model"), settingsManager.get("apiKey")]);

    if (!apiKey) {
        useGptResponseStore.setState({
            error: "No API key provided",
            loadingResponse: false,
            gptResponse: ""
        });
        return;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            stream: true,
            messages: [initialCgtMessage, { role: 'user', content: prompt }]
        })
    })

    const stream = response.body?.getReader()

    if (!stream) {
        useGptResponseStore.setState({
            error: "No stream received from OpenAI",
            loadingResponse: false,
            gptResponse: ""
        });
        return;
    }

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
}



const initialCgtMessage = {
    role: "system",
    content: "You are an AI assitant called 'QuickGPT'. You must answer all questions in markdown format. If the user asks for code, you must return it in the correct markdown format."
} as const

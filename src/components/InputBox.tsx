import { useState } from "react"
import { askGpt } from "../services/askGpt"
import { useQuickGptStore } from "../state/store"
import styles from "./inputbox.module.css"

export const InputBox = () => {
    const [loading, setLoading] = useState(false)
    const [input, setInput, setGptResponse] = useQuickGptStore(state => [state.input, state.setInput, state.setGptResponse])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const handleClear = () => {
        setInput("");
        setGptResponse("");
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setLoading(true);
            const { error, completion } = await askGpt(input)
            if (error) {
                console.error(error);
                setGptResponse("");
            } else {
                setGptResponse(completion as string);
            }
            setLoading(false);
        }

        if (event.key === "Escape") setInput("");
    };

    return <div className={styles.topArea} data-tauri-drag-region>
        <input
            autoFocus
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask GPT for help..."
            className={styles.inputBox}
            value={input}
        />
        {loading ? <button>Loading...</button>
            : <button onClick={handleClear}>Clear</button>}
    </div>
}

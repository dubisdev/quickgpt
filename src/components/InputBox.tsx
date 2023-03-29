import { askGpt } from "../services/askGpt"
import { useGptResponseStore } from "../state/gptResponseStore"
import { useInputStore } from "../state/inputStore"
import styles from "./inputbox.module.css"

export const InputBox = () => {
    const [input, setInput] = useInputStore(s => [s.input, s.setInput])
    const [setGptResponse, loadingResponse] = useGptResponseStore(s => [s.setGptResponse, s.loadingResponse])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const handleClear = () => {
        setInput("");
        setGptResponse("");
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            askGpt(input)
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
        {loadingResponse ? <button>Loading...</button>
            : <button onClick={handleClear}>Clear</button>}
    </div>
}

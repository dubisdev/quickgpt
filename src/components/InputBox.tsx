import { useEffect, useRef } from "react"
import { listen } from "@tauri-apps/api/event"
import { askGpt } from "../services/askGpt"
import { useInputStore } from "../state/inputStore"
import styles from "./inputbox.module.css"

export const InputBox = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useInputStore(s => [s.input, s.setInput])

    useEffect(() => {
        listen("focus-input", () => {
            inputRef.current?.focus()
        })
        listen("set-input", ({ payload }) => {
            inputRef.current?.focus()
            setInput(payload as string)
        })
    }, [])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            askGpt(input)
        }
    };

    return <div className={styles.topArea} data-tauri-drag-region>
        <input
            ref={inputRef}
            autoFocus
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask GPT for help..."
            className={styles.inputBox}
            value={input}
        />
    </div>
}

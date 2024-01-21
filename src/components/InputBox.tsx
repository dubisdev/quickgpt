import { useEffect, useRef } from "react"
import { listen } from "@tauri-apps/api/event"
import { askGpt } from "../services/askGpt"
import { useInputStore } from "../state/inputStore"
import styles from "./inputbox.module.css"
import { useGptResponseStore } from "../state/gptResponseStore"
import { LoadingIcon } from "./LoadingIcon"
import { SettingsIcon } from "./SettingsIcon"
import { useHashLocation } from "../hooks/useHashLocation"
import { Routes } from "../Routes/routes"

export const InputBox = () => {
    const [_, navigate] = useHashLocation()
    const inputRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useInputStore(s => [s.input, s.setInput])
    const loading = useGptResponseStore(s => s.loadingResponse)

    useEffect(() => {
        listen("focus-input", () => { inputRef.current?.focus() })
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
            navigate(Routes.Response)
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
        {loading ? <LoadingIcon /> : <SettingsIcon />}
    </div>
}

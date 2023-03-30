import ReactMarkdown from "react-markdown";
import { useGptResponseStore } from "../state/gptResponseStore";
import { Prism } from 'react-syntax-highlighter'
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark'
import styles from "./gptresponse.module.css"
import { ResultLayout } from "./ResultLayout";
import { getCurrent } from "@tauri-apps/api/window";
import { useRef } from "react";

const GptResponse = () => {
    const responseEndRef = useRef<HTMLDivElement>(null)
    const [gptResponse, setGptResponse, loadingResponse] = useGptResponseStore(s => [
        s.gptResponse,
        s.setGptResponse,
        s.loadingResponse
    ])

    const handleClear = () => {
        setGptResponse("");
        getCurrent().emit("set-input", "");
    }

    const scrollToBottom = () => {
        responseEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    scrollToBottom()

    return <ResultLayout>

        <ReactMarkdown children={gptResponse} className={styles.response}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match
                        ? <Prism
                            children={String(children).replace(/\n$/, '')}
                            // @ts-ignore
                            style={a11yDark}
                            language={match[1]}
                            PreTag="div"
                            wrapLines={true}
                            wrapLongLines={true}
                            {...props}
                        />
                        : <code className={className} {...props}>{children}</code>

                }
            }} />
        {!loadingResponse && <button onClick={handleClear} className={styles.clearButton}>Clear</button>}
        <div ref={responseEndRef}></div>
    </ResultLayout>

};

export default GptResponse;

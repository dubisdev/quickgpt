import ReactMarkdown from "react-markdown";
import { useGptResponseStore } from "../state/gptResponseStore";
import { Prism } from 'react-syntax-highlighter'
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark'
import styles from "./gptresponse.module.css"
import { ResultLayout } from "./ResultLayout";
import { useInputStore } from "../state/inputStore";

export const GptResponse = () => {
    const setInput = useInputStore(s => s.setInput)

    const [gptResponse, setGptResponse, loadingResponse] = useGptResponseStore(s => [
        s.gptResponse,
        s.setGptResponse,
        s.loadingResponse
    ])

    const handleClear = () => {
        setInput("");
        setGptResponse("");
    }

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
        {
            loadingResponse
                ? <button className={styles.clearButton}>Loading...</button>
                : <button onClick={handleClear} className={styles.clearButton}>Clear</button>
        }
    </ResultLayout>

};

import ReactMarkdown from "react-markdown";
import { useGptResponseStore } from "../state/gptResponseStore";
import { Prism } from 'react-syntax-highlighter'
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark'
import styles from "./gptresponse.module.css"
import { ResultLayout } from "./ResultLayout";

export const GptResponse = () => {
    const gptResponse = useGptResponseStore(state => state.gptResponse)

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
    </ResultLayout>

};

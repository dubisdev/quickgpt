import { useGptResponseStore } from "../state/gptResponseStore"
import { ResultLayout } from "./ResultLayout"

export const ErrorMessage = () => {
    const gptErrorResponse = useGptResponseStore(s => s.error)

    return <ResultLayout>
        Error: {gptErrorResponse}
        <br />
        Check your API key typing <strong>:settings:</strong> in the input box.
    </ResultLayout>
}

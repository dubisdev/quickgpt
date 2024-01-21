import { useGptResponseStore } from "../state/gptResponseStore";
import { ResultLayout } from "./ResultLayout"

const ErrorMessage = () => {
    const error = useGptResponseStore(s => s.error)
    return <ResultLayout>
        Error: {error}
        <br />
        Check your API key typing <strong>:settings:</strong> in the input box.
    </ResultLayout>
}

export default ErrorMessage;

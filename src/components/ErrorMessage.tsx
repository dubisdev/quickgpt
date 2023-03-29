import { ResultLayout } from "./ResultLayout"

export const ErrorMessage = ({ error }: { error: string }) => {
    return <ResultLayout>
        Error: {error}
        <br />
        Check your API key typing <strong>:settings:</strong> in the input box.
    </ResultLayout>
}

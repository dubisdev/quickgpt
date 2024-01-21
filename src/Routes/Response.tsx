import { useEffect } from "react"
import ResponseComponent from "../components/GptResponse"
import { useGptResponseStore } from "../state/gptResponseStore"
import { useHashLocation } from "../hooks/useHashLocation"
import { Routes } from "./routes"

export const ResponseRoute = () => {
    const [_, navigate] = useHashLocation()
    const [loadingResponse, gptResponse] = useGptResponseStore(s => [s.loadingResponse, s.gptResponse])
    const error = useGptResponseStore(s => s.error)

    useEffect(() => {
        if (error) {
            return navigate(Routes.Error)
        }

        if (!loadingResponse && !gptResponse) {
            navigate(Routes.Home)
        }
    }, [loadingResponse, gptResponse, error])

    return <ResponseComponent />
}

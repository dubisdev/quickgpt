import { useEffect } from "react"
import ErrorMessageComponent from "../components/ErrorMessage"
import { useGptResponseStore } from "../state/gptResponseStore"
import { Routes } from "./routes"
import { useHashLocation } from "../hooks/useHashLocation"

export const ErrorRoute = () => {
    const error = useGptResponseStore(s => s.error)
    const [_, navigate] = useHashLocation()

    useEffect(() => {
        if (!error) {
            navigate(Routes.Home)
        }
    }, [error])

    return <ErrorMessageComponent />
}

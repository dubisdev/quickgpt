import { useEffect } from "react"
import { resizeWindow } from "../services/resizeWindow"

export const useMaximizedWindow = () => {
    useEffect(() => {
        resizeWindow("expanded")

        return () => {
            resizeWindow("input")
        }
    }, [])
}

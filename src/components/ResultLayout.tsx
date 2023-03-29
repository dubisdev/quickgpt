import type { FC, PropsWithChildren } from "react"
import { useMaximizedWindow } from "../hooks/useMaximizedWindow"
import styles from "./resultlayout.module.css"

export const ResultLayout: FC<PropsWithChildren> = ({ children }) => {
    useMaximizedWindow()
    return <div className={styles.resultBox}>{children}</div>
}

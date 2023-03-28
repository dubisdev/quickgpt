import { useMaximizedWindow } from "../hooks/useMaximizedWindow";
import { settingsManager } from "../services/settingsManager";
import styles from "./settings.module.css";

export const Settings = () => {
    useMaximizedWindow()
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>QuickGTP Settings</h2>
            <section className={styles.options}>
                <label>
                    Model (only one available for now):
                    <input defaultValue={settingsManager.getCache("model")} disabled />
                </label>
                <label>
                    OpenAI API Key:
                    <input defaultValue={settingsManager.getCache("apiKey")} onChange={(e) => settingsManager.set("apiKey", e.target.value)} />
                </label>
            </section>
        </div>
    );
};

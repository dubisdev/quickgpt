import { settingsManager } from "../services/settingsManager";
import { ResultLayout } from "./ResultLayout";
import styles from "./settings.module.css";

const Settings = () => {
    return <ResultLayout>
        <div className={styles.wrapper}>
            <h2 className={styles.title}>QuickGTP Settings</h2>
            <section className={styles.options}>
                <label>
                    Model:
                    <input defaultValue={settingsManager.getCache("model")} disabled />
                </label>
                <label>
                    OpenAI API Key:
                    <input defaultValue={settingsManager.getCache("apiKey")} onChange={(e) => settingsManager.set("apiKey", e.target.value)} />
                </label>
            </section>
        </div>
    </ResultLayout>
};

export default Settings;

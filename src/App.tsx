import { GptResponse } from "./components/GptResponse";
import { InputBox } from "./components/InputBox";
import { Settings } from "./components/Settings";
import { useQuickGptStore } from "./state/store";
import styles from "./styles.module.css";

export const QuickGpt = () => {
  const input = useQuickGptStore(s => s.input)
  const gptResponse = useQuickGptStore(s => s.gptResponse)

  const shouldDisplaySettings = input.match(/^:settings:$/i);

  return (
    <div data-tauri-drag-region className={styles.container}>
      <InputBox />

      {!shouldDisplaySettings && gptResponse && <div className={styles.resultBox}><GptResponse /></div>}
      {shouldDisplaySettings && <div className={styles.resultBox}><Settings /></div>}
    </div>
  );
}

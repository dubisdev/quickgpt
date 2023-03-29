import { GptResponse } from "./components/GptResponse";
import { InputBox } from "./components/InputBox";
import { Settings } from "./components/Settings";
import { useInputStore } from "./state/inputStore";
import { useGptResponseStore } from "./state/gptResponseStore";
import styles from "./styles.module.css";
import { ErrorMessage } from "./components/ErrorMessage";

export const QuickGpt = () => {
  const input = useInputStore(s => s.input)
  const [gptResponse, gptResponseError] = useGptResponseStore(s => [s.gptResponse, s.error])

  const shouldDisplaySettings = input.match(/^:settings:$/i);
  const shouldDisplayGptResponse = !shouldDisplaySettings && gptResponse && !gptResponseError;

  return (
    <div data-tauri-drag-region className={styles.container}>
      <InputBox />

      {shouldDisplayGptResponse && <GptResponse />}
      {shouldDisplaySettings && <Settings />}
      {gptResponseError && <ErrorMessage />}
    </div>
  );
}

import { lazy, Suspense } from "react";
import { useInputStore } from "./state/inputStore";
import { useGptResponseStore } from "./state/gptResponseStore";
import { InputBox } from "./components/InputBox";
import styles from "./styles.module.css";

const GptResponseLazy = lazy(() => import("./components/GptResponse"));
const SettingsLazy = lazy(() => import("./components/Settings"));
const ErrorLazy = lazy(() => import("./components/ErrorMessage"));

export const QuickGpt = () => {
  const input = useInputStore(s => s.input)
  const [gptResponse, gptResponseError] = useGptResponseStore(s => [s.gptResponse, s.error])

  const shouldDisplaySettings = input.match(/^:settings:$/i);
  const shouldDisplayGptResponse = !shouldDisplaySettings && gptResponse && !gptResponseError;

  return (
    <div data-tauri-drag-region className={styles.container}>
      <InputBox />

      {shouldDisplayGptResponse && <Suspense><GptResponseLazy /></Suspense>}
      {shouldDisplaySettings && <Suspense><SettingsLazy /></Suspense>}
      {gptResponseError && <Suspense><ErrorLazy error={gptResponseError} /></Suspense>}
    </div>
  );
}

import { InputBox } from "./components/InputBox";
import styles from "./styles.module.css";
import { Route, Router } from "wouter";
import { useHashLocation } from "./hooks/useHashLocation";
import { ErrorRoute, ResponseRoute, Routes, SettingsRoute } from "./Routes/routes";

export const QuickGpt = () => {
  return (
    <div data-tauri-drag-region className={styles.container}>
      <InputBox />

      <Router hook={useHashLocation}>
        <Route path={Routes.Response}><ResponseRoute /></Route>
        <Route path={Routes.Settings}><SettingsRoute /></Route>
        <Route path={Routes.Error}><ErrorRoute /></Route>
        <Route></Route>
      </Router>

    </div>
  );
}

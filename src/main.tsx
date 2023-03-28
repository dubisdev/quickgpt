import React from "react";
import ReactDOM from "react-dom/client";
import "the-new-css-reset"
import "./styles.css"
import { QuickGpt } from "./App";
import { setupListeners } from "./services/setupListeners";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QuickGpt />
  </React.StrictMode>
);

setupListeners()

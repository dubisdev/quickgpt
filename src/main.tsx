import React from "react";
import ReactDOM from "react-dom/client";
import "the-new-css-reset"
import { QuickGpt } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QuickGpt />
  </React.StrictMode>
);

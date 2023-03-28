import { getCurrent, LogicalSize } from "@tauri-apps/api/window";
type Mode = "input" | "expanded"

export const resizeWindow = async (mode: Mode) => {
    const window = getCurrent();
    const newHeight = mode === "input" ? 40 : 600;

    window.setSize(new LogicalSize(600, newHeight));

}

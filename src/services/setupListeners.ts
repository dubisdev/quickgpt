import { register } from "@tauri-apps/api/globalShortcut";
import { getCurrent } from "@tauri-apps/api/window";

const setupListeners = () => {
    const tauriWindow = getCurrent();

    register("Alt+A", async () => {
        if (await tauriWindow.isVisible()) {
            tauriWindow.hide();
        } else {
            await tauriWindow.show();
            await tauriWindow.setFocus();
        }

    });
};

export { setupListeners }

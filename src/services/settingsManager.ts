import { SettingsManager } from "tauri-settings";

export type Schema = {
    /**
     * The model used to generate the text
     */
    model: string;
    /**
     * The OpenAI API key
     */
    apiKey: string;
};

const settingsManager = new SettingsManager<Schema>(
    { model: "gpt-3.5-turbo", apiKey: "" },
    { prettify: true }
);

// creates or loads the settings file
await settingsManager.initialize();

export { settingsManager }

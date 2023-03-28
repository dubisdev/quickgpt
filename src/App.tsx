import { useState } from "react";
import styles from "./styles.module.css";

export const QuickGpt = () => {
  const [gptResponse, setGptResponse] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  return (
    <div data-tauri-drag-region className={styles.container}>
      <input autoFocus onKeyDown={handleKeyDown} placeholder="Ask GPT for help..." className={styles.inputBox}/>
      { gptResponse && <div>{gptResponse}</div> }
    </div>
  
   
  );
}

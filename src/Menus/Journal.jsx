import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
function Journal() {
    console.log(import.meta.env.VITE_VARIABLE)
    console.log(import.meta.env.BACK_END_VARIABLE)
    const [tauri_env, setTauri_env] = useState("")
    useEffect(async () => {
        
            const response = await invoke("get_env_var", "BACK_END_VARIABLE");
            console.log(response);
            setTauri_env(response);
        ;
    }, []);
  return (
    <div>
      <h1>Journal</h1>
      <div> {tauri_env} </div>
      <button onClick={() => {import.meta.env.VITE_VARIABLE = "KILLED"} }>Get Journal</button>
    </div>
  );
}

export default Journal;
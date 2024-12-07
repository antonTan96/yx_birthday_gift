import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';

// When using the Tauri global script (if not using the npm package)
// Be sure to set `app.withGlobalTauri` in `tauri.conf.json` to true


function GetFile() {
    const [str, updateStr] = useState("");
    const enc = new TextDecoder()
    useEffect(()=> {
        async function getBackend () {
            let backend = await invoke('read_file');
            console.log(backend);
        
            updateStr(enc.decode(backend));
        }
        getBackend()
    },[])
    return (
        <div>
            {str}
        </div>
    )
}

export default GetFile;
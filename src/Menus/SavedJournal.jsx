import React, { useEffect, useState } from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { invoke } from "@tauri-apps/api/core";


function SavedThoughts() {
    const [thoughts, setThoughts] = useState([]);
    useEffect(() => {
        invoke("get_thoughts", {filePath: "1.json"}).then((response) => {
            setThoughts(response);
            console.log(response);
        });
    }, []);
  return (
    <div>
        <Button
        component="span"
        style={{ color: "black" }}
        onClick={() => window.history.back()}
        startIcon={<ArrowBackRounded />}>
      </Button>
      <h1>Saved Journal</h1>
    </div>
  );
}

export default SavedThoughts;
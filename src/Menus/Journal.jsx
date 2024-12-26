import { useEffect, useState, useRef} from "react";
import { invoke } from "@tauri-apps/api/core";
import { ArrowBackRounded } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./../fonts/MadimiOne-Regular.ttf";
function Journal() {
  const textRef = useRef(null);
  const navigate = useNavigate();

  function printText() {
    console.log(textRef.current.value); 
    invoke("save_thought", {content: textRef.current.value}).then((res) => {
      textRef.current.value = "";
    }
    );
  }

  return (
    <div>
      <Button
        component="span"
        style={{ color: "black" }}
        onClick={() => window.history.back()}
        startIcon={<ArrowBackRounded />}>
      </Button>
    <Container>
      <Typography variant="h4" sx={{
        pt: "20px",
        fontFamily: "MadimiOne"
      }}>Whats on your mind?</Typography>

      <div style={{height: "50vh", marginTop: "20px"}}>
      <textarea ref={textRef} cols="120" style={{width:"100%", height:"100%", background:"transparent", resize: "none", boxShadow:"none", outline:"none"}} />
      </div>

      <div style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between"}}>
      <Button variant="contained" onClick={() => printText()}
        style={{
          border: "2px solid #000000",
          borderRadius: "10px",
          background: "#DE52EA",
          fontSize: "clamp(6px, calc(1vw + 0.75rem), 32px)",
        }}> Submit </Button>

      <Button variant="contained" onClick={() => {navigate("/journal/saved_thoughts")}}
        style={{
          border: "2px solid #000000",
          borderRadius: "10px",
          background: "#DE52EA",
          fontSize: "clamp(6px, calc(1vw + 0.75rem), 32px)",
        }}> Review Thoughts </Button>
        </div>
        </Container>  
    </div>
  );
}

export default Journal;
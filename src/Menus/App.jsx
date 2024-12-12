import React from "react";
import { useNavigate } from "react-router-dom";
import kitty from "./../assets/cat 1.png"
import drugs from "./../assets/drugs.png"
import gift from "./../assets/Gift box.svg"
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { Modal, Box } from "@mui/material";

import "./../fonts/MadimiOne-Regular.ttf";

function App() {
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);

  return (
    <>
      <img src={kitty} alt="kitts" style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        height: "26%",
        width: "29%",
      }} />

      <img src={drugs} style={{
        position: "fixed",
        top: "50%",
        left: "70%",
        textAlign: "center",
        height: "38%",
        width: "27%",
        transform: "translate(-50%, -50%)"
      }} alt="pills" />

      <button style={{
        position: "fixed",
        bottom: "0",
        right: "0",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
        
        onClick={() => { setOpen(true) }}> 
        <img src={gift}
          style={{
            height: "clamp(10px, calc(5vw + 1rem), 100px)",
            width: "clamp(10px, calc(5vw + 1rem), 100px)",
            transition: "box-shadow 0.3s ease",
            borderRadius: "20px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 30px 15px rgba(255, 255, 0, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";}}
          ></img></button>
      <div style={{
        position: "fixed",
        textAlign: "center",
        top: "50%",
        left: "calc(min(10%, 5rem))",
        transform: "translateY(-50%)",
      }}>
        <Typography variant="h1" style={{
          fontFamily: "MadimiOne",
          fontSize: "clamp(12px, calc(5vw + 1rem), 96px)",
        }}>
          Welcome!
        </Typography>
        <Button variant="contained" onClick={() => navigate("/journal")}
          style={{
            border: "2px solid #000000",
            borderRadius: "10px",
            background: "#DE52EA",
            fontSize: "clamp(6px, calc(1vw + 0.75rem), 32px)",
          }}> Start yapping </Button>
      </div>
      <MessageModal open = {open} setOpen={setOpen} navigate={navigate} /> 

    </>
  );
}

function MessageModal(props) {
  return (
    <Modal
  open={props.open}
  onClose={() => props.setOpen(false)}
>
  <Box style={{
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    textAlign: "center",
    width: "60vw",
    backgroundColor: "#F9D87D",
    border: "2px solid #000000",
    borderRadius: "10px",
    padding: "20px",
  }}>
    <Typography variant="h3" >
     <u>WOW ITS A GIFT</u>
    </Typography>
    
    <Typography variant="body" 
    style={{fontSize:"20px",
    }}>
      You have received a gift!<br/>
       Would you like to accept it? <br/> {" "} 
    </Typography>
    <Button variant="contained" onClick={() =>props.navigate("/messages")}
          style={{
            border: "2px solid #000000",
            borderRadius: "10px",
            background: "#DE52EA",
            fontSize: "clamp(6px, calc(1vw + 0.75rem), 32px)",
            marginTop:"20px"
          }}> Accept Gift</Button>
  </Box>
</Modal>
  );
  
  
}

export default App;
import React from "react";
import { useNavigate } from "react-router-dom";
import kitty from "./assets/cat 1.png"
import drugs from "./assets/drugs.png"// 2989 x 2820 png
import { useState } from "react";
function App() {
  let navigate = useNavigate()
    
  return (
    <>
    <img src={kitty} alt="kitts" style={{
      position: "fixed",
      bottom: "0",
      left: "0",
      height: "26%",
      width: "29%",
    }}/>
    
    <img src={drugs} style={{
      position: "fixed",
      top: "50%",
      left: "70%",
      textAlign: "center",
      height: "38%",
      width: "27%",
      transform: "translate(-50%, -50%)"
    }} alt="pills" />    
   
    
    <div>
      I learned how to package a html {":)"} BUT WITH RUST
    </div>
    <button onClick={()=>navigate("/increment")}> go to incrementer </button>
    <button onClick={()=>navigate("/file")}> go to file </button>
    </>
    );
}

export default App;
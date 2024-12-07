import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Incrementer() {
    const [num, updateNum] = useState(0);
    let navigate = useNavigate();


    return (
        <div>
            <div>{num}</div>
            <button onClick={()=> updateNum((prev) => prev + 1)}>+1</button>
            <button onClick={()=> navigate(-1)}>Back to main</button>
        </div>
    )
}

export default Incrementer;
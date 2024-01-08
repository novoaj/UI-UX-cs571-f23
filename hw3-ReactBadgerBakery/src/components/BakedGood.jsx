import { useState } from 'react'
export default function BakedGood(props) {
    const[count, setCount] = useState(0);
    const disabled = count === 0 ? true : false;
    const style = props.featured ? {
            border:'3px solid white',
            borderRadius: "10%",
            backgroundColor: "rgb(243, 229, 171)",
            margin: "4px"
            }:
            {
                backgroundColor: "rgb(243, 229, 171)",
                borderRadius: "10%",
                margin: "4px"
            }
    return <div style={style}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p>${props.price}</p>
        <div>
            
            <button className="inline" onClick={() =>setCount(count-1)} disabled={disabled}>-</button>
            <p className="inline">{count}</p>
            <button className="inline" onClick={() => setCount(count+1)}>+</button>
        </div>
        
    </div>
}
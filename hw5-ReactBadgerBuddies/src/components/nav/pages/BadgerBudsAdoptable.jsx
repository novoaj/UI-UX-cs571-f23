import { useContext, useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import BadgerBudSummary from "./BadgerBudSummary"
import {Row, Col} from "react-bootstrap"
import { useEffect } from "react";
// https://react.dev/reference/react/useContext

export default function BadgerBudsAdoptable(props) {

    
    const data = useContext(BadgerBudsDataContext);
    // const savedCats = (Object.keys(sessionStorage)); 
    // //session stores all adopted and saved cats, may want to separate
    // console.log(savedCats);
    const [adoptableCats, setAdoptableCats] = useState([]);
    
    const getCatStatus = (id) => sessionStorage.getItem(id) || "no_status";

    useEffect(()=> {
        setAdoptableCats(data);
    }, [data])

    const onSave = (id) => {
        const updated = adoptableCats.filter((c) => c.id !== id);
        setAdoptableCats(updated);
    }
    if (!adoptableCats){
        return (<div>Loading...</div>)
    };

    return <Row>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p> 
        { // only display data that's id isn't in session storage
            (adoptableCats.filter(cat => (getCatStatus(cat.id) === "no_status")).length == 0 ? (
                <p>no cats available for adoption</p>
            ) : 
            (
                adoptableCats
                    .map(cat => {
                    var cat_status = getCatStatus(cat.id);
                    if (cat_status === "no_status"){
                        return <Col xs={12} s={12} md = {6} lg = {4} xl = {3} key = {cat.id}><BadgerBudSummary {...cat} onSave={()=> onSave(cat.id)}/></Col>
                        }   
                    }) 
            ))
                
        }
    </Row>   
}

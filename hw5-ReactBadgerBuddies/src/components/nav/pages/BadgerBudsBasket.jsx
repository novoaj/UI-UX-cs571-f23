import { useContext, useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BasketItem from "./BasketItem";
import {Row, Col} from "react-bootstrap";
import { useEffect } from "react";

export default function BadgerBudsBasket(props) {

    const data = useContext(BadgerBudsDataContext);
    //const savedCats = (Object.keys(sessionStorage)); 
    //adopted cats and basket cats, value tells us "adopted" or "saved"
    const [basketCats, setBasketCats] = useState([]);
    const getCatStatus = (id) => sessionStorage.getItem(id) || "no_status";

    useEffect(()=> {
        setBasketCats(data);
    }, [data])
    const onUnselect = (id) => {
        // update basketCats (remove this id from basketCats) and probably savedCats
        const updated = basketCats.filter(cat=> cat.id !== id);
        setBasketCats(updated);
    }

    const onAdopt = (id) => {
        const updated = basketCats.filter(cat=> cat.id !== id); // removes from this page
        setBasketCats(updated);
    }
    return <Row>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {
            (basketCats.filter((cat) => (getCatStatus(cat.id) === "saved")).length == 0 ? (
                <p>you have no cats in your basket</p>
                ) : 
                (
                    basketCats
                        .map(cat => {
                        if (getCatStatus(cat.id) === "saved"){
                            return (<Col 
                                xs={12} s={12} md = {6} lg = {4} xl = {3}  key = {cat.id}>
                                    <BasketItem {...cat} onUnselect={() => onUnselect(cat.id)} onAdopt={()=>onAdopt(cat.id)}/>
                                </Col>)
                        }
                    })
                ))
        }
    </Row>
}
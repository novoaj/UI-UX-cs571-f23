import {Button, Card} from "react-bootstrap";
import {useState} from "react";
import { useEffect } from "react";


const Item = (props) => {
    const images = props.imgIds.map((imgId) => {
        return "https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/" + (imgId);
    })
    const alt = "photo of " + props.name
    function handleUnselect(){
        sessionStorage.removeItem(props.id);
        alert(props.name + "has been removed from your basket!");
        props.onUnselect();
    }
    function handleAdopt(){
        // sessionStorage
        sessionStorage.removeItem(props.id);
        sessionStorage.setItem(props.id, "adopted")
        alert("Thank you for adopting " + props.name)
        props.onAdopt();
    }
    return <Card>
            <p>{props.name}</p>
            <img style = {{ aspectRatio: "1 / 1" }} src={images[0]} alt={alt} />
            <Button onClick = {handleUnselect}>Unselect</Button>
            <Button onClick = {handleAdopt}>Adopt </Button>
        </Card>
}
export default Item;
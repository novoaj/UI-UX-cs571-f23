import {Button, Card, Carousel, CarouselItem} from "react-bootstrap";
import {useState} from "react";
import { useEffect } from "react";
const Buddy = (props) => {
    
    const [showMore, setShowMore] = useState(false);
    const images = props.imgIds.map((imgId) => {
        return "https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/" + (imgId);
    })
    const alt = "photo of " + props.name
    const age = props.age + " month(s) old";
    function handleSave(){
        sessionStorage.setItem(props.id, "saved")

        alert(props.name + " has been added to your basket")

        props.onSave()
    }
    return <Card>
        <p>{props.name}</p>
        

        {showMore ? ( 
        <>
            <Carousel> 
                {images.map((image, index) => (
                    <CarouselItem key = {index}>
                         <img style = {{ aspectRatio: "1 / 1" }} src = {image} alt = {alt}></img>
                         </CarouselItem>
                ))}
            </Carousel>
            <p>{props.gender}</p>
            <p>{props.breed}</p>
            <p>{age}</p>
            {props.description ? <p>{props.description}</p> : null}
            <Button onClick={() => setShowMore(false)}>Show Less </Button>
        </>
        ) : 
        (<>
        <img style = {{ aspectRatio: "1 / 1" }} src={images[0]} alt={alt} />
        <Button onClick={() => setShowMore(true)}>Show More</Button>
        </>
        )
        }
        <Button onClick={(handleSave)}>
            Save
        </Button>
        </Card>
}

export default Buddy;
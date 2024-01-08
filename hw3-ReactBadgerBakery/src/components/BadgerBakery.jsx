import { useEffect, useState } from "react"
import BakedGood from "./BakedGood";
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw3/all-baked-goods", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBakedGoods(data);
        })
    }, [])

    const [featured, setFeatured] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        fetch("https://cs571.org/api/f23/hw3/featured-baked-good", {
            headers:{
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setFeatured(data);
            setLoading(false)
        })
    }, [])
    const div_style = {
        backgroundColor: "rgb(220, 20, 60)",
        padding: "10px",
        fontFamily: "Arial",
    }
    return <div style = {div_style}>
        <h1>Badger Bakery</h1>
        <p>Welcome to our small-town bakery located in Madison, WI!</p>
        <div>
            {isLoading ? <p>Loading...</p> : <p>Today's featured item is {featured.name} for {featured.price}!</p>}
        </div>
        <hr/>
        <Container>
            <Row>
            {
                bakedGoods.map(bakedGood => {
                    return <Col key={bakedGood.name} xs={12} md={6} lg={4} xl={3}>
                        <BakedGood
                            name={bakedGood.name}
                            description={bakedGood.description}
                            price={bakedGood.price}
                            featured={bakedGood.featured}
                        />
                    </Col>
                })
            }
            </Row>
        </Container>
    </div>
}
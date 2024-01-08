import { Alert, Text, View, Button } from "react-native";
import { useState } from "react";
import BadgerBakedGood from "./BadgerBakedGood";
// import CS571 from "@cs571/mobile-client";
import { useEffect } from "react";

export default function BadgerBakery() {
    const [goods, setGoods] = useState([]);
    const [page, setPage] = useState(0);
    const [basket, setBasket] = useState({}); // object to store basket

    let goods_array = undefined
    useEffect(() => {
        let url = "https://cs571.org/api/f23/hw7/goods"
        let badger_id = "bid_c4e9255a3b26c8f0f79abaf30c9ab53eb847bb705548c76dd574e141680a0c35"
        fetch(url, {
            headers: {
                "X-CS571-ID": badger_id,
            }
        }
        )
            .then(res => {
                if (res.status !== 200){
                    Alert.alert("something went wrong with your request, error code: " + res.status + " " + res.msg)
                }else{
                    return res.json();
                }
            })
            .then(data => {
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                goods_array = Object.entries(data).map(([id, item]) => ({id,...item}));
                setGoods(goods_array);
                // Alert.alert(JSON.stringify(goods_array[0], null, 2))
            })
    }, []);

    const currentItem = goods[page]

    const addToBasket = (id) => {
        setBasket((prevBasket) => ({
            ...prevBasket,
            [id]: (prevBasket[id] || 0) + 1,
        }))
    }

    const removeFromBasket = (id) => {
        setBasket((prevBasket) => {
            let count = prevBasket[id] || 0;
            if (count > 0) {
                const newBasket = {...prevBasket};
                newBasket[id] = count - 1
                if (newBasket[id] === 0){ // remove from basket
                    delete newBasket[id]
                }
                return newBasket
            }else{
                return prevBasket
            }
        })
    }
    const total = (Object.keys(basket).reduce((total, id) => {
        const item = goods.find((g=> g.id === id))
        return total + (item ? item.price * basket[id] : 0 )
    },0)).toFixed(2);

    const order = () => {
        if (Object.keys(basket).length > 0) {
            Alert.alert(
                `Order Confirmed, your order contains ${Object.keys(basket).length} items and costs $${total}`
            )
            setBasket({})
            setPage(0);

        }
    }
    return <View>
        <Text>Welcome to Badger Bakery!</Text>
        {currentItem ? 
            <BadgerBakedGood
                key={currentItem.id} 
                item={currentItem}
                onAdd= {() => addToBasket(currentItem.id)}
                onRemove = {() => removeFromBasket(currentItem.id)}
                count = {basket[currentItem.id] || 0}
                /> 
                : 
                <></>
        }
        <Button
            title = "Previous"
            onPress={() => setPage((prevIndex => prevIndex - 1))}
            disabled = {page === 0}
        />
        <Button
            title = "Next"
            onPress={() => setPage((prevIndex => prevIndex + 1))}
            disabled = {page === goods.length - 1}
        />
        <Text>${total}</Text>
        <Button
            title = "place order"
            onPress={order}
            disabled = {Object.keys(basket).length === 0 || total === 0}
        />
    </View>
}

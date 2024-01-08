import { Text, View, Image, Button } from "react-native";

export default function BadgerBakedGood({item, onAdd, onRemove, count}) {
    const max = item.upperLimit == -1 ? "unlimited" : item.upperLimit
    return <View>
        <Image style = {{width:200, height:200}} source = {{uri: item.imgSrc}}></Image>
        <Text>{item.name}</Text>
        <Text>${item.price.toFixed(2)}</Text>
        <Text>you can order up to {max}</Text>
        <View style={{alignContent:"center"}}>
            <Button
                title = "-"
                onPress={onRemove}
                disabled={count <= 0 || item.upperLimit === 0}
            />
            <Text>{count}</Text>
            <Button
                title = "+"
                onPress={onAdd}
                disabled={item.upperLimit !== -1 && count === item.upperLimit}
            />
        </View>
    </View>
}

import { Text, View, Image } from "react-native";
import {React} from "react"

export default function BadgerNewsCard(props) {

    return (
        <View>
            <Image 
            style={{ width: 200, height: 200 }}
            source={{
                uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${props.article.img}`
            }}
            />
            <Text style={{fontSize: 18}}>{props.article.title}</Text>
        </View>

)
    
}


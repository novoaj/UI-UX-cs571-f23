import { Text, View, Pressable, ScrollView, Linking } from "react-native";
import {React} from "react"
import { useEffect, useState, useCallback } from "react";

const openInBrowser = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url)
    }else{
        Alert.alert("Couldn't open this link")
    }
}

export default function(props){

    const details = props.route.params;
    const [article, setArticle] = useState(null);

    const url = `https://cs571.org/api/f23/hw8/article?id=${details.articleId}`
    const BADGER_ID = "bid_c4e9255a3b26c8f0f79abaf30c9ab53eb847bb705548c76dd574e141680a0c35"

    useEffect(() => {
        fetch(url, {
            headers:{
                "X-CS571-ID": BADGER_ID,
            }
        })
        .then(res => {
            if (res.status !== 200){
                alert(res.status);
            }
            return res.json()
        }
        )
        .then(data => {
            setArticle(data);
            console.log(article.url)
        })
    }, [])


    return (
        
        <ScrollView>
            {(article === null) ? 
            <>
            <Text>Loading...</Text>
            </>:
            <>
                <Text style = {{fontSize: 24}}>
                    {article.title}
                </Text>
                <Text style = {{fontSize: 18}}>
                    By {article.author} on {article.posted}
                </Text>
                <Pressable onPress={() => openInBrowser(article.url)}>
                    <Text>Read Full Article Here</Text>
                </Pressable>
                {article.body.map((paragraph, idx) => (
                    <View key = {idx}>
                    <Text style= {{fontSize: 12}} >{paragraph}</Text>
                    </View>
                ))}
            </>
            }
        </ScrollView>
    )
}
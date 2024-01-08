import { Text, View, ScrollView, Pressable } from "react-native";
import { useEffect, useState, useContext } from 'react';
import BadgerNewsCard from '../BadgerNewsItemCard';
import {useNavigation} from "@react-navigation/native";
import PrefContext from "../contexts/PrefContext";



function BadgerNewsScreen(props) {

    const [data, setData] = useState([]);
    const BADGER_ID = "bid_c4e9255a3b26c8f0f79abaf30c9ab53eb847bb705548c76dd574e141680a0c35"
    const navigation = useNavigation();
    const [prefs, setPrefs] = useContext(PrefContext);

    // fetch from https://cs571.org/api/f23/hw8/articles
    const url = "https://cs571.org/api/f23/hw8/articles"
    console.log("prefs from news")
    console.log(prefs)
    useEffect(() => {
      fetch(url, {
        headers : {
          "X-CS571-ID": BADGER_ID
        }
      })
      .then(res => {
        if (res.status !== 200){
          alert("fetch failed")
        }
        return res.json()
      })
      .then(data => {
        setData(oldData => data);
        //  collect 
        const initial_prefs = data.reduce((prefs, article) => {
            article.tags.forEach((tag) => (prefs[tag] = true))
            return prefs
          }, {});
        setPrefs(initial_prefs)
      })
  
    }, [])

    const handlePress = (articleId) => {
      // navigate to full news article , push article onto stack?
      navigation.push("Article", {
          articleId: articleId // fetch article using this id inside NewsArticle.jsx
        })
    }
    return <View>
        {/* <Text style={{paddingTop: 128}}>When I get to Step 3, I will need to be inside a nested stack navigator!</Text> */}
        <ScrollView>

        {data
          .filter((article) => {
            return article.tags.every((tag) => prefs[tag]);
          })
          .map(
          article => {
            // {console.log(article)} // article.tags if not every tag in prefs, filter out article
            return <Pressable  key = {article.id} onPress={() => handlePress(article.fullArticleId)}>
              <BadgerNewsCard 
              article = {article}
              
              />
              </Pressable>
          }
        )}
        </ScrollView>
    </View>
}

export default BadgerNewsScreen;
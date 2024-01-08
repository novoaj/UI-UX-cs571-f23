import { Text } from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewsArticle from "../NewsArticle";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//https://reactnavigation.org/docs/bottom-tab-navigator/
function NewsStack() {
    return (
        <Stack.Navigator  
        //     screenOptions = {{
        //     headerShown: false,
        // }}
        >
            <Stack.Screen 
            // options = {{
            // headerShown: false,
            // }}
            name ="News" component={BadgerNewsScreen}/>
            <Stack.Screen name= "Article" component={NewsArticle}/>
        </Stack.Navigator>
    )
}
function BadgerTabs(props) {
    return <Tab.Navigator
        // screenOptions = {{
        //     headerShown: false,
        // }}
        >
        
        <Tab.Screen 
            options = {{
            headerShown: false,
            }}
            name="News" 
            component = {NewsStack}
            />
        {/* {news is a stack navigator} */}
        <Tab.Screen name="Preferences" component = {BadgerPreferencesScreen}/>
    </Tab.Navigator>
}

export default BadgerTabs;
import { useContext } from "react";
import { Text, View, Switch } from "react-native";
import  PrefContext  from "../contexts/PrefContext";

function BadgerPreferencesScreen(props) {

    // fetch articles and grab tags?, create tags array that will become switches
    // switches will need to be passed and updated via context to avoid drillling down
    // when displaying news articles, will need to be able to see what is switched on and off
    const [prefs, setPrefs] = useContext(PrefContext);
    const handleSwitch = (key) => {
        setPrefs((oldPrefs) => ({
            ...oldPrefs,
            [key]: !oldPrefs[key] // flip the switch
        }));
        console.log("changed pref")
        console.log(prefs)
    }
    return (<View>
        {Object.entries(prefs).map(([key,value]) => (
            <View>
                <Text>{key}</Text>
                <Switch
                    value={value}
                    onValueChange= {() => handleSwitch(key)}
                />
            </View>
        ))}
    </View>)
}

export default BadgerPreferencesScreen;
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import {useState} from "react";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <TextInput
            onChangeText={setUsername}
            value = {username}
            placeholder="username"
            style={styles.input}
        />
        <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="password"
            secureTextEntry={true}
            style = {styles.input}
        />
        <TextInput
            onChangeText={setPassword2}
            value={password2}
            placeholder="re-enter password"
            secureTextEntry={true}
            style = {styles.input}
        />
        <Button 
            color="crimson" 
            title="Signup" 
            onPress={() => {
            if (password === "" || password2 === "") {
                Alert.alert("Please enter a password");
            }else if (password !== password2){
                Alert.alert("Passwords do not match");
            }else{
                props.handleSignup(username, password);

            }
        }} 
        />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        padding: 10
    }
});

export default BadgerRegisterScreen;
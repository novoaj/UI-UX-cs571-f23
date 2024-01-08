import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import {useState, useEffect} from "react"

function BadgerLoginScreen(props) {

    const [username, onChangeUsername] = useState("")
    const [password, onChangePassword] = useState("")

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <TextInput
            onChangeText={onChangeUsername}
            value={username}
            placeholder="username"
            style = {styles.input}
        />
        <TextInput
            onChangeText={onChangePassword}
            value={password}
            placeholder="password"
            secureTextEntry={true}
            style = {styles.input}
        />
        <Button color="crimson" title="Login" onPress={() => {
            props.handleLogin(username, password)
        }} />
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
        <Button color="grey" title="Continue as Guest" onPress={() => {props.continueAsGuest()}}/>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 10
    }
});

export default BadgerLoginScreen;
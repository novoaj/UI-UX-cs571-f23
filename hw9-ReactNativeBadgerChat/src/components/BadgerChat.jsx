import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Alert} from "react-native";
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {
  const BADGER_ID = "bid_c4e9255a3b26c8f0f79abaf30c9ab53eb847bb705548c76dd574e141680a0c35"
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw9/chatrooms", {
      method: "GET",
      headers: {
        "X-CS571-ID": BADGER_ID,
        "Content-Type": "application/json"
      },
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      setChatrooms(data);
    })
  }, []);

  function handleLogin(username, password) {
    // hmm... maybe this is helpful!
    fetch("https://cs571.org/api/f23/hw9/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_c4e9255a3b26c8f0f79abaf30c9ab53eb847bb705548c76dd574e141680a0c35",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then(res => {
        if (res.status !== 200){
          Alert.alert("something went wrong with your login request!")
        }else{
          
        }
        return res.json()
      })
      .then(data => {
        console.log(data) 
        // need to store the authorization token if successful
        if (data.msg === "Successfully authenticated."){
          // store data.token securely
          save("token", data.token)
          save("username", data.user.username)
          setIsLoggedIn(true);
          setIsGuest(false)
        }else{
          setIsLoggedIn(false)
        }
        
      })
     // I should really do a fetch to login first!
  }

  function handleSignup(username, password) {
    // hmm... maybe this is helpful!
    fetch("https://cs571.org/api/f23/hw9/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": BADGER_ID,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username:username,
        password:password
      })
    })
      .then(res => {
        if (res.status !== 200){
          Alert.alert(res.status)
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        if (data.msg === "Successfully authenticated."){
          save("token", data.token)
          save("username", data.user.username)
          setIsLoggedIn(true);
          setIsGuest(false)
        }else if (data.msg === "The user already exists!"){
          Alert.alert("this username is taken!")

        }
      })
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
    console.log("saved item to secure store at key " + key)
    
  }
  async function getValue(key){
    let result = await SecureStore.getItemAsync(key)
    // console.log("getValue")
    // console.log(result)
      if (result){
        return result
      } else {
        Alert.alert("Secure Storage", "no value found")
      }

  }
  async function deleteValue(key){
    let result = await SecureStore.deleteItemAsync(key)
  }

const cleanSecureStore = async() => {
    await deleteValue("token");
    await deleteValue("username");
    console.log("cleared secure store")
}
  async function handleLogout(){
    cleanSecureStore();
    setIsLoggedIn(false);
    setIsRegistering(true)

  }
  function continueAsGuest() {
    console.log("guest user")
    setIsLoggedIn(true);
    setIsGuest(true)
    // in child components we can try to fetch username and if no username
    // or token, then we know that the user is a guest user
  }
  // console.log("badger chat")
  // console.log(getValue("token"));
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} getValue={getValue}/>}
              </ChatDrawer.Screen>
            })
          }
          {(!isGuest) ? 
            <>
              <ChatDrawer.Screen 
              name="logout">
                {() => (<BadgerLogoutScreen handleLogout={handleLogout}/>)}
              </ChatDrawer.Screen>
            </> : 
            <>
              <ChatDrawer.Screen 
              name="signup">
                {() => (<BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering}/>)}
              </ChatDrawer.Screen>
            </>}
          
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} continueAsGuest={continueAsGuest}/>
  }
}
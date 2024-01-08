import { StyleSheet, Text, View, ScrollView, Button, Modal, Alert, TextInput } from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage"
import {useEffect, useState} from "react";

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const BADGER_ID = "bid_c4e9255a3b26c8f0f79abaf30c9ab53eb847bb705548c76dd574e141680a0c35"
    const [username, setUsername] = useState("");
    
    const fetchUsername = async() => {
        try{
            const loadedUsername = await props.getValue("username")
            setUsername(loadedUsername);
        }catch(error){
            console.error("error retrieving username", error)
        }
    }
    useEffect(() => {

        fetchUsername();
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}&page=${page}`, {
        method: "GET",
        headers: {
            "X-CS571-ID": BADGER_ID,
            "Content-Type": "application/json"
        }
        })
        .then(res => res.json())
        .then(data=> {
            if (data.msg === "Successfully got the latest messages!"){
                setMessages(data.messages)
            }
        })
    }, [page])

    const handlePrev = () => {
        if (page > 1){
            setPage(page-1)
        }
    }
    const handleNext = () => {
        if (page < 4){
            setPage(page+1)
        }
    }
    const handleCreatePost = async () => {
        console.log("create a post")
        try{
            const token = await props.getValue("token")
            console.log("creating post, need token...")
            console.log(token)

            // need to do POST request to post using this token
            fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}`, {
                method: "POST",
                headers: {
                    "X-CS571-ID": BADGER_ID,
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postBody
                })
            })
            .then(res => {
                // check that response is expected
                if (res.status !== 200){
                    console.log(res.status)
                }
                return res.json()
            })
            .then(data => {
                // if response is as expected, close modal, alert user
                if (data.msg === "Successfully posted message!"){
                    setModalVisible(false)
                    Alert.alert("message post successful!")
                    setPage(1)
                    setPostBody("")
                    setPostTitle("")
                }
                console.log(data.msg)
            })
        }catch(error){
            console.error("error retrieving token", error)
        }
    }

    const handleDelete = async (id) => {
        console.log("deleting " + id + "...")
        try {
            const token = await props.getValue("token")
            fetch(`https://cs571.org/api/f23/hw9/messages?id=${id}`, {
                method: "DELETE",
                headers: {
                    "X-CS571-ID": BADGER_ID,
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.status !== 200){
                        console.log("error on delete request")
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data.msg)
                    if (data.msg === "Successfully deleted message!"){
                        Alert.alert("Successfully deleted the post!")
                        setPage(1)
                    }
                }

                )
        }catch (error){
            console.error("error when deleting", error)
        }
    }

    return (<View  style={{ flex: 1 }}>
        <ScrollView>
        {messages.map((msg) => (
            <View  key = {msg.id}>
                <BadgerChatMessage 
                    title={msg.title}
                    content = {msg.content}
                    poster = {msg.poster}
                    created ={msg.created}
            />
            {msg.poster === username ? 
                <Button 
                    title = "Delete" 
                    onPress={() => handleDelete(msg.id)}/>
                : <></>}
            </View>
            ))}
        </ScrollView>
        <View style={{
            flexDirection: 'row',
            padding:10,
            marginBottom: 5,
            justifyContent: 'space-between'
        }}>
            <Button title = "prev" onPress={handlePrev} disabled={page===1}/>
            <Text>{`Page ${page}`}</Text>
            <Button title = "next" onPress={handleNext} disabled={page===4}/>
        </View>
        <View style={{
            flexDirection: 'row',
            padding:10,
            justifyContent: 'center'
        }}>
            <Button title = "add post" onPress={() => setModalVisible(true)}/>
        </View>
        <Modal
            animationType = "slide"
            transparent = {false}
            visible = {modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style = {{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100
            }}>
                <Text>Create Post</Text>
                <TextInput
                    style = {styles.input}
                    placeholder = "Title"
                    value = {postTitle}
                    onChangeText={setPostTitle}
                />
                <TextInput
                    style = {styles.input}
                    placeholder = "Body"
                    value = {postBody}
                    onChangeText={setPostBody}
                />
                <Button title = "Create Post" onPress={handleCreatePost} disabled={!postTitle || !postBody}/>
                <Button title="Cancel" onPress={() => setModalVisible(false)}/>
            </View>
        </Modal>
    </View>)
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5
    }
});

export default BadgerChatroomScreen;
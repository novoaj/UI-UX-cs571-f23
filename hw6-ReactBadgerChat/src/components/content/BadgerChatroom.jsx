import React, { useEffect, useState, useContext } from "react";
import BadgerMessage from "./BadgerMessage";
import {Row, Col, Pagination, Form, Button} from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const num_elements = 25;
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [triggerRefresh, setTriggerRefresh] = useState(0)

    // bid_c4e9255a3b26c8f0f79abaf30c9ab53eb847bb705548c76dd574e141680a0c35
    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"

        }).then(res => res.json()).then(json => {
            setMessages(json.messages);
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, triggerRefresh]);
    var messagesToDisplay = messages.slice((activePage-1)*num_elements, ((activePage-1)*num_elements+num_elements));
    console.log(messagesToDisplay)
    function handlePost(){
        console.log("post, make request");
        if (title === "" || content === ""){
            alert("You must provide both a title and content!")
        }else{
            const url = `https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`;
            console.log(url);
            fetch(url, {
                method: "POST",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            })
            .then(res => {
                if (res.status !== 200){
                    alert("Something went wrong")
                }else{
                    alert("Succesfully posted!")
                    setTitle("");
                    setContent("");
                    return res.json();
                }
            })
            .then(json => {
                console.log(json)
                setMessages(prevMessages => [...prevMessages, json])
                setTriggerRefresh(prev => prev + 1)
            })
        }
    }
    function onDelete(id){
        // do DELETE, if success do the other stuff belo this
        const url = `https://cs571.org/api/f23/hw6/messages?id=${id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => {
            if (res.status !== 200) {
                alert("couldn't delete the message!")
            }
            else{
                alert("deleted message succesfully!")
                return res.json()
            }
        })
        .then(json=>{
            const new_messages = messages.filter((m) => m.id !== id)
            setMessages(new_messages);
            setTriggerRefresh(prev => prev + 1)
        })
        
    }
    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            (loginStatus && loginStatus.loggedIn === true) ? 
            <Form>
                <Form.Label htmlFor="title">
                    Post title
                </Form.Label>
                <Form.Control value={title} onChange = {(e) => setTitle(e.target.value)} id = "title">
                </Form.Control>
                <Form.Label htmlFor="content">
                    Post content
                </Form.Label>
                <Form.Control value={content} onChange = {(e) => setContent(e.target.value)} id = "content">
                </Form.Control>
                <Button onClick={handlePost}>Post</Button>
            </Form> :
            <>
            <p>You must be logged in to post!</p>
            </>
        }
        <hr/>
        <Row>
            { // TODO messages to display depends on page number if page1, first 25, 2 = next 25 up to 100
             // dont wanna map all messages, just slice which ones we want, need to do checking if even enought messages (>0) to display on THIS page
             // content depends on current page
                messagesToDisplay.length !== 0 ?
                    <>
                        {
                        
                        messagesToDisplay.map(message => {
                            return <Col xs = {12} s = {6} md = {4} lg = {3} xl = {2}key = {message.id}><BadgerMessage 
                                poster = {message.poster} 
                                title = {message.title}
                                content = {message.content}
                                created = {message.created}
                                onDelete = {()=>onDelete(message.id)}
                                ></BadgerMessage></Col>
                        })
                        }
                    </>
                    :
                    <>
                        <p>There are no messages on this page yet!</p>
                    </>
            }
        </Row>
        <Pagination>
            <Pagination.Item key = {1} active={activePage === 1} onClick={() => setActivePage(1)}>1</Pagination.Item>
            <Pagination.Item key = {2} active={activePage === 2} onClick={() => setActivePage(2)}>2</Pagination.Item>
            <Pagination.Item key = {3} active={activePage === 3} onClick={() => setActivePage(3)}>3</Pagination.Item>
            <Pagination.Item key = {4} active={activePage === 4} onClick={() => setActivePage(4)}>4</Pagination.Item>
        </Pagination>
        
    </>
}

import {React, useState, useContext, useRef} from 'react';
import { Form, Button } from 'react-bootstrap';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router-dom";


export default function BadgerLogin() {

    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const usernameVal = useRef();
    const passwordVal = useRef();

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)
    
    function handleLogin() {
        const password = passwordVal.current.value
        const username = usernameVal.current.value
        // check for username and apssword
        if (username === "" || password == ""){
            alert("You must provide both a username and a password")
        }
        const url = "https://cs571.org/api/f23/hw6/login"
        fetch(url, {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if (res.status !== 200){
                alert("Incorrect username or password!")
            }else{
                alert("login succesful!")
                // redirect, set login status in session and context
                
                return res.json()
            }
        }).then(json => {
            sessionStorage.setItem("user", JSON.stringify({loggedIn:true, user:json.user}))
            console.log(json.user)
            setLoginStatus({loggedIn:true, user:json.user})
            console.log(loginStatus)
            navigate("/")
        })
    }
    return <>
        <h1>Login</h1>
        <Form.Label htmlFor ="username">
            Username
        </Form.Label>
        <Form.Control id = "username" ref={usernameVal}>
        </Form.Control>
        <Form.Label htmlFor="password">
            Password
        </Form.Label>
        <Form.Control id = "password" type = "password" ref={passwordVal}>
        </Form.Control>
        <Button onClick={handleLogin}>
            Login
        </Button>
    </>
}

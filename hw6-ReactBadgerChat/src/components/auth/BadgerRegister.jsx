import React from 'react';
import { useState, useContext, useRef} from 'react';
import {Col, Form, Row, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router-dom";

export default function BadgerRegister() {

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const usernameVal = useRef();
    const passwordVal = useRef();
    const password2Val = useRef();

    
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)
    
    
    
    function handleRegister(){
        const username = usernameVal.current.value
        const password = passwordVal.current.value
        const password2 = password2Val.current.value
        // check that nothing is blank -> alert "You must provide both a username and a password!"
        if (username === "" || password === "" || password2 === ""){
            alert("You must provide both a username and a password!");
        }
        else if (password !== password2){               // check that passwords match -> alert "Your passwords do not match!"
            alert("Your passwords do not match!")
        }
        else{
        // API interaction to register, different status codes/response means different things
        // either success alert -> "user registration successful" or alert "That username has already been taken"
            const url = "https://cs571.org/api/f23/hw6/register"
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
            })
            .then(res => {
                if (res.status !== 200){
                    alert("That username has already been taken");
                }else{
                    alert("user registration successful");
                    // redirect, set log in status -> persist this in session storage
                    return res.json()
                }
            })
            .then(json => {
                sessionStorage.setItem("user", JSON.stringify({loggedIn:true, user:json.user}))
                setLoginStatus({loggedIn:true, user:json.user})
                navigate("/")
            })
        }
    }
    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="username">
                Username
            </Form.Label>
            <Form.Control ref={usernameVal} id = "username">
            </Form.Control>
            <Form.Label htmlFor="password">
                Password
            </Form.Label>
            <Form.Control type = "password" ref={passwordVal} id = "password">
            </Form.Control>
            <Form.Label htmlFor="password2">
                Confirm Password
            </Form.Label>
            <Form.Control type = "password" ref={password2Val} id = "password2">
            </Form.Control>
            <Button onClick={handleRegister} >Register</Button>
        </Form>
    </>
}

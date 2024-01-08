import {React, useContext} from "react"
import { Card, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerMessage(props) {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    // if (loginStatus.user.username === props.poster){
    //     console.log(loginStatus.user.username);
    //     console.log(props);
    // }
    const canDelete = loginStatus.user.username === props.poster

    const dt = new Date(props.created);
    function handleDelete() {
        // callback with id of message to delete, parent componenet will make fetch request and refresh page
        console.log("delete this message")
        props.onDelete()
    }
    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            canDelete ? 
            <>
                <Button onClick={handleDelete}>Delete</Button>
            </> : 
            <>

            </>
        }
    </Card>
}

export default BadgerMessage;

import React, { useEffect, useContext } from 'react';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)


    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            setLoginStatus(undefined);
            sessionStorage.removeItem("user");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}

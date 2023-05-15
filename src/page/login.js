import React from "react";
import { Input } from "reactstrap";
import './login.css';

function Login() {
    return (
        <>
        <div className="log-sec">
            <h1>LOG IN</h1>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Input type="submit" value="LOG IN" />
        </div>
        </>
    )
}

export default Login;
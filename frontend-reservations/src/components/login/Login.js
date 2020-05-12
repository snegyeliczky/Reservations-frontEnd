import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";

import axios from "axios";
import {HotelContext} from "../HotelContext";
import {UserContext} from "../Context/UserContext";
import Cookies from "universal-cookie";
import {Alert} from "antd";
import "antd/dist/antd.css";

const Login = () => {
    const {changeLoginStatus} = useContext(UserContext);
    const {register, handleSubmit, errors} = useForm();
    const [toHome, setToHome] = useState(false);
    const [error, setError] = useState(false);
    const {fetchTodaysDate} = useContext(HotelContext);

    const onSubmit = data => {
        sendUserLogin(data);
    };

    const setErrorBack = () => {
        setError(false);
    };

    const setCookieForLogin = () => {
        let cookie = new Cookies();
        let date = new Date();
        date.setHours(date.getHours() + 8);
        cookie.set("isLoggedIn", true, {expires: date});
    };

    const wrongLogIn = () => {
        setError(true);
        document
            .querySelector(".WarningMessageForLogin")
            .setAttribute("id", "alert");
    };

    const sendUserLogin = data => {
        const url = "http://localhost:8762/auth/signin";
        axios
            .post(url, {
                username: data.username,
                password: data.password
            })
            .then(response => {
                //document.cookie = 'access_token=' + response.data.token;
                localStorage.setItem("roles", response.data);
                setCookieForLogin();
                changeLoginStatus();
                fetchTodaysDate();
                setToHome(true);
            })
            .catch(reason => {
                console.log("Nem jáauuuu Zoltán!!! " + reason);
                wrongLogIn();
            });
    };

    const loginForm = {
        padding: "20px",
        background: "rgba(255,255,255,.5)",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    };

    const loginBackground = {
        background: "transparent"
    };

    return (
        <div className="login-backgorund" style={loginBackground}>
            <div className="login-form align-middle" style={loginForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="h3">Login</p>
                    <div className="form-group">
                        <label>User Name</label>
                        <input
                            className="form-control mx-auto"
                            id="username"
                            name="username"
                            required
                            ref={register({required: true})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mx-auto"
                            id="password"
                            name="password"
                            required
                            ref={register({required: true})}
                        />
                    </div>
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                    {toHome ? <Redirect to={"/home"}/> : null}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
            {error ? (
                <Alert
                    message="Invalid Login"
                    description="False Username or Password!"
                    type="error"
                    className="WarningMessageForLogin"
                    closable
                    onClose={setErrorBack}
                />
            ) : null}
        </div>
    );
};

export default Login;

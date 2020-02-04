import React, { useState} from "react";
import {Redirect} from "react-router-dom";

import {useForm} from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Login = () => {
    const {register, handleSubmit, errors} = useForm();
    const [toHome, setToHome] = useState(false);


    const onSubmit = data => {
        console.log(data.username);
        console.log(data.password);
        //setToHome(true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
                Login
            </Typography>
            <TextField
                required
                id="username"
                name="username"
                label="Username"
                autoComplete="fname"
                inputRef={register({required: true})}
            />
            <br/>
            <br/>
            <br/>
            <TextField
                required
                id="password"
                type={"password"}
                name="password"
                label="Password"
                autoComplete="fname"
                inputRef={register({required: true})}
            />
            <br/>
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            {toHome ? <Redirect to={"/home"}/> : null}
            <input type="submit"/>
        </form>
    );
};

export default Login;

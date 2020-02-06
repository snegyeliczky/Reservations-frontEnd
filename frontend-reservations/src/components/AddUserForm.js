import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";

import {useForm} from 'react-hook-form';
import {HotelContext} from "./HotelContext";

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const AddUserForm = () => {
    const {register, handleSubmit, errors} = useForm();
    const {addNewUser} = useContext(HotelContext);
    const [toHome, setToHome] = useState(false);

    const [role, setRole] = useState();
    const classes = useStyles();


    const onSubmit = data => {
        addNewUser(data, role);
        setToHome(true);
    };

    const handleChange = event => {
        event.preventDefault();
        setRole(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-background">
            <Typography variant="h6" gutterBottom>
                New User Registration
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
            <TextField
                required
                id="password"
                name="password"
                label="Password"
                autoComplete="fname"
                inputRef={register({required: true})}
            />
            <br/>
            <FormControl required className={classes.formControl}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    required
                    labelId="role-label"
                    id="role"
                    name="role-native-required"
                    onChange={handleChange}
                >
                    <MenuItem value={"USER"}>User</MenuItem>
                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
            <br/>
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            {toHome ? <Redirect to={"/home"}/> : null}
            <input className="send" value="Submit" type="submit"/>
        </form>
    );
};

export default AddUserForm;

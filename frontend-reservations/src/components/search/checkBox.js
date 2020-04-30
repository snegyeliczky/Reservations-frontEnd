import React from "react";
import Checkbox from "@material-ui/core/Checkbox";


const CheckBoxes =() =>{

    const inStyle = {
            color: "#90EE90"
    };

    const checkinStyle ={
        color:"#ADD8E6"
    }

    const outStyle ={
        color:"#F08080"
    }



    return(
        <div>
            <Checkbox defaultChecked style={inStyle}/>
            <Checkbox defaultChecked style={checkinStyle}/>
            <Checkbox defaultChecked style={outStyle}/>
        </div>

    )


};

export default CheckBoxes;
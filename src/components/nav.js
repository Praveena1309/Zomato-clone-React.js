import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
const navhook = (Component)=>{
    return(props) =>{
        const navigate = useNavigate();
        return<Component navigate={navigate}{...props}/>
    }
}
export default navhook;
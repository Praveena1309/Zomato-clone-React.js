import React from "react";
import '../styles/homepage.css'
import Baner from "./homepagebaner";

import axios from "axios";
import Search from "./homepagesearch"
class Home extends React.Component{
    constructor(){
        super();
        this.state={
            location:[]

        }
    }
    componentDidMount(){
        axios({
            url:"http://localhost:5500/location",
            method:"GET",
            headers:{'content-Type':'application/JSON'}
        })
        .then(res=>{
            this.setState({location:res.data.location})
        })
        .catch(err => console.log(err))
        axios({
            url:"http://localhost:5500/mealtype",
            method:"GET",
            headers:{'content-Type':'application/JSON'}
        })
        .then(res=>{
            this.setState({mealtype:res.data.mealtype})
        })
        .catch(err => console.log(err))
    }
    
    render() {
        const{location,mealtype}=this.state;
        return(
            <div>
                <Baner locationData={location}/>

    
                <Search mealtypeData ={mealtype}/>
   

            </div>
        )
    }
}
export default Home;
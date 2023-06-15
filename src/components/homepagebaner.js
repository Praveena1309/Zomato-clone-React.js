import React from "react";
import '../styles/homepage.css'
import axios from "axios";
import navhook from "./nav";

class Baner extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants:[],
            inputtext:undefined,
            suggestion:[]
        }
    }
    handlelocationchange =(e) =>{
        const location = e.target.value;
        sessionStorage.setItem('location', location);

        axios({
            url:`http://localhost:5500/restaurant/${location}`,
            method:"GET",
            headers:{'content-Type':'application/JSON'}
        })
        .then(res=>{
            this.setState({restaurants:res.data.restaurants})
        })
        .catch(err => console.log(err))
    }

    handleinputchange= (event)=>{
        const {restaurants}= this.state;
        const inputtext = event.target.value;
        let suggestion=[];
        suggestion = restaurants.filter(item => item.name.toLowerCase().includes(inputtext.toLowerCase()));
        this.setState({inputtext,suggestion});
    }
    selectrestaturant =(ss)=>{
        this.props.navigate(`/details?restaurants=${ss}`);
    }
    showsuggestion=() =>{
        const{inputtext,suggestion}= this.state;
        if(suggestion.length==0 && inputtext== undefined){
            return null;
        }
        if(suggestion.length>0 && inputtext==''){
            return null;
        }
        if(suggestion.length==0 && inputtext){
            return(
                <li>no result found</li>
            )
        }
        return(
            suggestion.map((item,index) =>(
                <li key={index} onClick={()=> this.selectrestaturant(item._id)}>
                    <img className="suggimg" src={item.thumb}/>
                    <span className="suggheading">{item.name}</span>
                    <span className="suggtext">{item.locality}</span>
                </li>
            )
            )
        )
    }


    render(){
        const{locationData}=this.props;
        console.log(locationData)
        return(
            <div>
                                <div className="bg-image">
        <div className="container-fluid img-fluid">
            <div>
           
           {/*<!--center logo--> */}    
             <div className="row pt-4 mx-auto text-center mt-2">
                <div className="col-12">
                     <p className="px-4 py-2 px-md-4 py-md-2 px-sm-4 py-sm-2 logoid">e!</p>
               </div>
            </div>
           
            <div className="row pt-4 text-center">
                <div className="col-12">
                     <p className="restaurant-title">Find the best restaurants, cafés, and bars</p>
               </div>
            </div>
          {/* <!--drop down(Please type a location)& search--> */} 
            <div className="row pt-4 mx-auto text-center search-bar-row">
                <div className=" col-md-1 col-lg-3 col-xl-3"></div>
               
                <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 ">
                    <div className=" Pleasetypealocation ">
                        <select className="  loactiondropdown" onChange={this.handlelocationchange}>
                            <option className="selectarea" >Please type a location</option>
                            {
                  locationData.map((exo=>{
                    return(
                      <option className="selectarea" value={exo.city_id}>{`${exo.name}`}</option>
                    )
                  }))
                }
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 Search ">
                    <div className="input-group">
                        <span className="input-group-text bi bi-search"></span>
                        <input className="mainLoginInput  form-control" type="text" placeholder= "Search for restaurants" onChange={this.handleinputchange} />
                        <ul className="suggestionbox">{this.showsuggestion()}</ul>
                   </div>
                   <div className=" col-md-1 col-lg-2 col-xl-2"></div>
               </div>
     </div>
    </div>
    </div>
    </div>

            </div>
        )
    }
}
export default navhook(Baner);
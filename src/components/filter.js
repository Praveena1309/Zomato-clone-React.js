import React from "react";
import '../styles/filter.css'
import axios from "axios";
import navhook from "./nav";

class Filter extends React.Component{
    constructor(){
        super();
        this.state={
            restaurant:[],
            location:[],
            sort:1,
            page:1

        }
    }
    componentDidMount(){
        axios({
            url:`http://localhost:5500/filter`,
            method:"POST",
            headers:{'Content-Type':'application/JSON'}
        })
        .then(res=>{
            this.setState({restaurant:res.data.restaurants})
        })
        .catch(err => console.log(err))
        axios({
            url:"http://localhost:5500/location",
            method:"GET",
            headers:{'content-Type':'application/JSON'}
        })
        .then(res=>{
            this.setState({location:res.data.location})
        })
        .catch(err => console.log(err))
    }

    handlelocationchange=(val) =>{
        const{sort,page,lcost,hcost} = this.state;

        const locat = val.target.value;

        const filterobj ={
            location: locat,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url:`http://localhost:5500/filter`,
            method:"POST",
            headers:{'Content-Type':'application/JSON'},
            data:filterobj
        })
        .then(res=>{
            this.setState({restaurant:res.data.restaurants,locat})
        })
        .catch(err => console.log(err))

    }

    handlesortchange= (sort)=>{
        const{locat, page,lcost,hcost,cuisine} = this.state;
        const filterobj ={
            location: locat,
            lcost,
            hcost,
            sort,
            page,
            cuisine:[cuisine]
        };

        axios({
            url:`http://localhost:5500/filter`,
            method:"POST",
            headers:{'Content-Type':'application/JSON'},
            data:filterobj
        })
        .then(res=>{
            this.setState({restaurant:res.data.restaurants,sort})
        })
        .catch(err => console.log(err))
    }

    handlepagechange= (page)=>{
        const{locat,sort,lcost,hcost,cuisine} = this.state;
        const filterobj ={
            location: locat,
            lcost,
            hcost,
            sort,
            page,
            cuisine:[cuisine]
        };

        axios({
            url:`http://localhost:5500/filter`,
            method:"POST",
            headers:{'Content-Type':'application/JSON'},
            data:filterobj
        })
        .then(res=>{
            this.setState({restaurant:res.data.restaurants,page, cuisine})
        })
        .catch(err => console.log(err))


    }

    handlepricechange=(lcost,hcost)=>{
        const{locat,sort,page,cuisine} = this.state;
        const filterobj ={
            location: locat,
            lcost,
            hcost,
            sort,
            page,
            cuisine:[cuisine]
        };

        axios({
            url:`http://localhost:5500/filter`,
            method:"POST",
            headers:{'Content-Type':'application/JSON'},
            data:filterobj
        })
        .then(res=>{
            this.setState({restaurant:res.data.restaurants,lcost,hcost,cuisine})
        })
        .catch(err => console.log(err))


    }

    handleCuisine=(cuisine)=>{
        const{locat,sort,page,lcost,hcost }=this.state;
        const filterobj ={
          location:locat,
          lcost, 
          hcost,
          sort,
          page,
          cuisine:[cuisine]
          
        };
        axios({
          url:`http://localhost:5500/filter`,
          method:"POST",
          headers:{'Content-Type':'application/JSON'},
          data:filterobj
        })
        .then(res=>{
          this.setState({restaurant:res.data.restaurants,sort,page,lcost, hcost,cuisine})
          console.log(res.data.restaurants)
        })
        .catch(err =>console.log(err))
      
      }


    hanndlenavigate= (id)=>{
        this.props.navigate(`/details?restaurants=${id}`);
    }


    render(){
        const{restaurant,location}=this.state;
        return(
            <div>
                   
    <div className="heading">
        Breakfast Places in Mumbai
    </div>
              
    
    <div className="Filters">
        <p className="filterhead">Filters</p>
        <p className="filterLocation">Select Location</p>
        <select className="location" onChange={this.handlelocationchange}>
                <option disabled selected>Select Location</option>
                {
                  location.map((exo=>{
                    return(
                      <option className="selectarea" value={exo.city_id}>{`${exo.name}`}</option>
                    )
                  }))
                }
        </select>
        <div>
            <p className="filtercheck">Cuisine </p>
            <div className="Cuisine">    
            <input type="checkbox" className="check1" onChange={() => this.handleCuisine(1)} />
    <label className="check">North Indian</label> <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(2)} />
    <label className="check">South Indian</label>
    <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(3)} />
    <label className="check">Chinese</label>
    <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(4)} />
    <label className="check">Fast Food</label>
    <br />
    <input type="checkbox" className="check1" onChange={() => this.handleCuisine(5)} />
    <label className="check">Street Food</label>

            </div>
        </div>    
        <div>
            <p className="filterradio">Cost For Two</p>
            <div className="cost">
                <input type="radio" name="radio" className="check2" onChange={()=>this.handlepricechange(1,500)}/><label className="check5">Less than ` 500</label> <br/>
                <input type="radio" name="radio" className="check2" onChange={()=>this.handlepricechange(500,1000)}/><label className="check5">` 500 to ` 1000</label><br/>
                <input type="radio" name="radio" className="check2" onChange={()=>this.handlepricechange(1000,1500)}/><label className="check5">` 1000 to ` 1500</label><br/>
                <input type="radio" name="radio" className="check2" onChange={()=>this.handlepricechange(1500,2000)}/><label className="check5">` 1500 to ` 2000</label><br/>
                <input type="radio" name="radio" className="check2" onChange={()=>this.handlepricechange(2000,5000)}/><label className="check5">` 2000+</label><br/>
            </div>
        </div>
        <div>
            <p className="filtersort">Sort</p>
            <div className="Sort">
                <input type="radio" name="radio1" className="check3" onChange={()=> this.handlesortchange(1)} /> <label className="check4">Price low to high</label> <br/>
                <input type="radio" name="radio1" className="check3" onChange={()=> this.handlesortchange(-1)} /> <label className="check4">Price high to low</label><br/>
            </div>
        </div>
    </div>

    <div className="result">
    { restaurant.length!=0?
        restaurant.map((kai)=>{
            return(
                

                <div className="result1" onClick={()=> this.hanndlenavigate(kai._id)}>
                    <div>
                        <div className="pic">
                            <img src={kai.thumb}/>
                        </div>
                        <div className="right">
                            <p className="la">{kai.name}</p>
                            <p className="la1">{kai.locality}</p>
                            <p className="la2">{kai.address}</p>
                         </div>
                    </div>
                    <hr className="hrline"/>
                    
                    <div className="below">
                            <div className="part">
                                <p className="part1">CUISINES:</p> 
                                <p className="part2">COST FOR TWO:</p>
                            </div>
                            <div className="subpart">
                                <p className="part3">{kai.Cuisine.map((s)=>`${s.name},`)}</p>
                                <p className="part4">{kai.cost}</p>
                            </div>
                    </div>
                </div>    
        
              
                  
           
            )
        }) :  <div style={{ color: "#192F60", fontSize: "50px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}> Sorry. No result found </div>

    }
     </div>

   
{/*<!-- ============result ends ==============->*/}
    <div className="page">
        <button className="pageno">&lt;</button>
        <button className="pageno" onClick={()=>this.handlepagechange(1)}>1</button>
        <button className="pageno" onClick={()=>this.handlepagechange(2)}>2</button>
        <button className="pageno" onClick={()=>this.handlepagechange(3)}>3</button>
        <button className="pageno" onClick={()=>this.handlepagechange(4)}>4</button>
        <button className="pageno" onClick={()=>this.handlepagechange(5)}>5</button>
        <button className="pageno">&gt;</button>
    </div>

            </div>
        )
    }
}
export default navhook(Filter);
import React from "react";
import { useNavigate } from "react-router-dom";

const Qsitem =(props)=>{
    const{_id,name,content,image}=props.data;
    const nav = useNavigate();
    const Showfilter=()=>{
         nav('./filter',{replace:true})
    }
    return(
    <><div onClick={()=>Showfilter()}>
    
         <div className="row g-4 " id="gbvcd">
             <div className="col-lg-2"></div>
             <div className="col-4 product">
                 <img  src={`./img/${image}`} className="img-fluid productimgggb" />
                 <div className="px-4 my-auto"id="crjf">
                     <h6 className="Breakfastdhdh">{name}</h6>
                     <p className="prodetail">{content}</p>
                 </div> 
             </div> 
         
        </div> 
     </div><br /></> 
                
)
}

export default Qsitem
import React, {  useRef, useState } from 'react'

function Todocompo() {

    const mydata=['ghee','bottle','chini','aatta'];

    // const [itemname,setItemname]=useState("");
    const [myitem,setMyitem]=useState(mydata);
  
    // const onnameChange=(e)=>{
    //     // console.log();
    //     const name_value=e.target.value;
    //     setItemname(name_value);
    // }
    const mynewName=useRef();


   
    const handleNAme=(e)=>{
        e.preventDefault();
        // console.log(itemname);
        // myitem.push(itemname);
        const itemname=mynewName.current.value;
        mynewName.current.value="";
        const newdata=[...myitem,itemname];
        setMyitem(newdata);
        // setItemname("");
        
       

    }

  return (
    <div>
        <form action="">
            <label htmlFor="" >Enter your todo : </label>
            <input type="text" 
            ref={mynewName}
            //  onChange={onnameChange}
              />
        

            <button type="submit" onClick={handleNAme}>Add items</button>
        </form>


       <ul>
        {
            myitem.map((data,i)=>(
                <li key={i}>{data}</li>
            ))
        }
       </ul>
            
        
    </div>
  )
}

export default Todocompo
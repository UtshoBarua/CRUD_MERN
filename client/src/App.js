import { useEffect, useState } from "react";
import "./App.css"
import Axios from "axios";



function App() {
 const [foodName,setFoodName] = useState("");
  const[day,setDay] = useState(0)
  const[newFoodName,setNewfoodName] = useState("")
  const [foodList,setFoodList] = useState([])
  const addToList=()=>{
    Axios.post("http://localhost:3001/insert",{foodname:foodName,days:day})
}
const updateFood=(id)=>{
  Axios.put("http://localhost:3001/update",{
    id:id,
    newFoodName:newFoodName
  })
}
const deleteFood=(id)=>{
Axios.delete(`http://localhost:3001/delete/${id}`)


}
  useEffect(()=>{
      Axios.get("http://localhost:3001/read").then((response)=>{
        setFoodList(response.data)
      })
  },[])
  console.log(foodList)

 return (
    
    <div className="App">
      <h1>Jibon amar boro bodle gechee...</h1>
      <label>Food Name</label>
      <input type="text" onChange={(event)=>{setFoodName(event.target.value)}} ></input>
      <label>Days since you ate it</label>
      <input type="number" onChange={(event)=>setDay(event.target.value)} ></input>
      <button onClick={addToList} >Add to list</button>
      <h1>Food List</h1>
      {foodList.map((val,key)=>{
       return <div key={key}> <h1>{val.foodName}</h1> <h1>{val.daysSinceIAte}</h1> 
       <input type="text" onChange={(event)=>setNewfoodName(event.target.value)} ></input>
       <button onClick={()=>updateFood(val._id)} >Update</button> <br/>
       <button onClick={()=>deleteFood(val._id)}>Delete</button> 
       </div>
      })}
    </div>


  );
}

export default App;

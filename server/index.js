const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./models/Food.js')
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://admin:admin123@cluster0.4pladmm.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser:true,
})

app.post("/insert",async(req,res)=>{
    const foodName = req.body.foodname;
    const days = req.body.days;


    const food = new FoodModel({foodName:foodName,daysSinceIAte:days});
    try{
        await food.save();
        res.send("Data inserted sucessfully")
    }catch(err){
         console.log(err)
    }


})

app.get("/read",(req,res)=>{
  FoodModel.find({}, (err,result)=>{
    if(err){
        res.send(err)
    }
    res.send(result )
  })
})
app.put("/update",async(req,res)=>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
       await FoodModel.findById(id,(err,updatedFood)=>{
            updatedFood.foodName = newFoodName
            updatedFood.save();
            res.send("updated")     
        })
    }
    catch(err){
        console.log(err)
     }
})

app.delete("/delete/:id", async(req,res)=>{
        const id = req.params.id
        
        await FoodModel.findByIdAndRemove(id).exec();
        res.send("Data deleted sucessfully")

})


app.listen(3001,()=>{
    console.log("server is running port 3001")
})

  
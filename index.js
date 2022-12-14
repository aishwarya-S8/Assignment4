const mongoose = require("mongoose");
const express=require("express");
const app=express();
const logger = require('./logger');

app.use(express.json());

//DB connection
mongoose.connect("mongodb://localhost:27017/localUser",{useNewUrlParser:true, useUnifiedTopology:true});
console.log("Running...")
//JSON Structure
const data={
    name:String,
    email:String,
    id:Number
}


//Creating new table in db
const monmodel=mongoose.model("NEWCOLS",data);
//Post request
app.post("/post",async(req,res)=>{
    logger.info("Inside post function")
    const user=new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    })
    const val =await user.save();
    res.json(val);
    logger.info(logger.info(val))
})


//Update request
app.put("/update/:id", async(req,res)=>{
    let upid=req.params.id;
    let upname=req.body.name;
    let upemail=req.body.email;

    monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},{new:true},(error,data)=>{
        if(error){
            res.send("Error");
        }
        else{
            if(data==null)
            {
                logger.error("Nothing found");
                res.send("Nothing found");
            }
            else{
                res.send(data);
                logger.info(data)
            }
        }
    })
})

//Get request
app.get('/fetch', function(req,res){
    monmodel.find(({}),function(error,val){
        if(error){
            res.send("Error");
        }else{
        if(val.legnth==0)
        {
            res.send("data does not exists");
        }
        else{
            res.send(val);
            logger.info(val)
        }
       
    }
    })
})
app.listen(1246,()=>{
    logger.info("One port 1255");
})

module.exports=app
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json())
const validuser=(req,res,next)=>{
  // Logs the raw cookie string
 // Logs the parsed cookies
    const token =req.cookies['jwt'];
    if(token){
      jwt.verify(token,'secret',async(err,data)=>{
      if(err){
        
        console.log(err);
        res.status(400).send()
      }else{
      
       
        req.userId = data.userId; 
        console.log("kumar");
        next();
      }})}
      else{
        res.status(400).send('ok')
      }
  }
module.exports= validuser
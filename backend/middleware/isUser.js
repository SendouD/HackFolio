const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json())
const validuser=(req,res,next)=>{
  // Logs the raw cookie string
  console.log('Parsed Cookies:', req.cookies); // Logs the parsed cookies
    const token =req.cookies['jwt'];
    if(token){
      jwt.verify(token,'secret',async(err,data)=>{
      if(err){
        console.log(err);
        console.log("hitt");
        res.status(400).send()
      }else{
        next();
      }})}
      else{
        console.log("mmm")
        res.status(400).send()
      }
  }
module.exports= validuser
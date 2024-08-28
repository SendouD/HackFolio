const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const ejs = require("ejs");
const ProjectSubmission=require("./controller/project_submission");
const hack_create = require("./controller/hackathon_creation");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/projects",ProjectSubmission)


mongoose.connect(`mongodb://127.0.0.1:27017/hackpro`, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");
});

app.use("/api/projects",ProjectSubmission)
app.use("/api/hackathon", hack_create);
app.get('/S3URL',(req,res)=>{
  

})

app.listen(5000, () => { console.log("Server started on port 5000(http://localhost:5000/)") });
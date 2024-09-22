const express = require('express');
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");
const cors = require("cors");
const axios = require("axios");
const ProjectSubmission=require("./controller/project_submission");
const hack_create = require("./controller/hackathon_creation");
const userlogin=require("./controller/userRegistration");
const jwtverifier=require("./controller/jwtVerifier");
const project_finder=require("./controller/project_finder")
const user=require("./controller/UserProfile")
const sponsor=require("./controller/Sponsor");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(`mongodb://127.0.0.1:27017/hackpro`, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");
});

app.use("/api/project",project_finder)
app.use("/api/hackathon", hack_create);
app.use("/api/userlogin",userlogin);
app.use("/api/jwtverify",jwtverifier);
app.use("/api/user",user);
app.use("/api/sponsor",sponsor);
app.listen(5000, () => { console.log("Server started on port 5000 ... (http://localhost:5000/)") });
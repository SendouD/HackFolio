const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");
const cors = require("cors");
const hack_create = require("./controller/hackathon_creation");
const userlogin=require("./controller/userRegistration");
const jwtverifier=require("./controller/jwtVerifier");
const project_finder=require("./controller/project_finder")
const user=require("./controller/UserProfile");
const hack_register = require('./controller/hackathonRegistration');
const sponsor=require("./controller/Sponsor");
const chat_backend = require("./controller/chat_backend");
const chatStatusModel = require("./models/chat_status_model");
const judges=require('./controller/Judges');
const hack_project = require('./controller/project');
const userProfile = require("./controller/userProfileEdit");


app.use(express.json());
app.use(cookieParser());
app.use(cors());

const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],        
      credentials: true           
  }
});

io.use((socket, next) => {
  const token = JSON.parse(socket.handshake.auth.token);
  if (!token) {
      return next(new Error('Authentication error'));
  }
  socket.email = token.email;
  next();
});

io.on('connection', async (socket) => {
  console.log('User connected:', socket.id);

  await chatStatusModel.findOneAndUpdate({ email: socket.email }, {
      status: true,
      socketId: socket.id,
  });

  socket.on('chatMessage', async (msg) => {
    console.log('Message received:', msg);

    try{
      const data = await chatStatusModel.findOne({email: msg.to});
      if(data && data.status === true){
        io.to(data.socketId).emit('chatMessage', msg);
      }
    } catch(e){
      console.error("Error:",e)
    }
  });

  socket.on('disconnect', async() => {
    await chatStatusModel.findOneAndUpdate({ email: socket.email }, {
      status: false,
      socketId: "",
    });
      console.log('User disconnected! socket ID: ' + socket.id);
  });

  socket.on('error', (err) => {
      console.error('Socket error:', err);
  });
});

const mongoUri = `mongodb://127.0.0.1:27017/hackpro`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// MongoDB connection event handlers
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");
});

// Express route to fetch all collections and their data
app.get("/get-all-collections", async (req, res) => {
  try {
    // Get a list of all collections in the 'hackpro' database
    const collections = await db.db.listCollections().toArray();

    const allData = {};

    // Iterate over each collection, fetch its data, and add it to the result
    for (const collection of collections) {
      const collectionName = collection.name;

      // Fetch documents from each collection
      const collectionData = await db.collection(collectionName).find({}).toArray();

      // Add the collection's data to the result object
      allData[collectionName] = collectionData;
    }

    // Send the collections data as the response
    res.status(200).json({
      success: true,
      data: allData,
    });
  } catch (error) {
    console.error("Error fetching collections data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching collections data",
      error: error.message,
    });
  }
});

app.use("/api/userProfile",userProfile)
app.use("/api/project",project_finder);
app.use("/api/hackathon", hack_create);
app.use("/api/hackathon", hack_register);
app.use("/api/userlogin",userlogin);
app.use("/api/jwtverify",jwtverifier);
app.use("/api/user",user);
app.use("/api/sponsors",sponsor);
app.use("/api/chat",chat_backend(io));
app.use("/api/judge",judges);
app.use("/api/project",hack_project);




server.listen(5000, () => { console.log("Server started on port 5000 ... (http://localhost:5000/)") });
const express = require("express");
const app= express();
const cors = require('cors');
const dotenv= require("dotenv")
const MongoDB = require("./config/db");
const authRoute = require("./routes/AuthRoute");
const taskRoute = require("./routes/TaskRoute");
const bodyparser =require("body-parser")
const compression = require("compression")
dotenv.config()

app.use(bodyparser.json())
app.use(express.json());
app.use(cors())
app.use(compression())

app.use(cors({
    origin: "https://dnd-front-iota.vercel.app", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    credentials: true // Allow credentials if needed
  }));

app.use("/api/auth",authRoute)
app.use("/api",taskRoute)

MongoDB();

const PORT = process.env.PORT||8080;
app.listen(PORT,()=>{
console.log(`conected localhost/:${PORT}`);
})
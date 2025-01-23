const express = require("express");
const app= express();
const cors = require('cors');
const dotenv= require("dotenv")
const MongoDB = require("./config/db");
const authRoute = require("./routes/AuthRoute");
const taskRoute = require("./routes/TaskRoute");

dotenv.config()

app.use(express.json());
app.use(cors())

app.use("/api/auth",authRoute)
app.use("/api",taskRoute)

MongoDB();

const PORT = process.env.PORT||8080;
app.listen(PORT,()=>{
console.log(`conected localhost/:${PORT}`);
})
const express = require("express");
const app = express();
const port= 8800;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:false},(err)=> {
    // console.log("Connected to MongoDB");
    if(err) console.log("err::",err)
    else console.log("mongoDB is connected");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);

app.get("/",(req,res) => {
    res.send("welcome to homepage");
})

app.get("/users",(req,res) => {
    res.send("welcome to users page");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
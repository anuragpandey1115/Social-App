const express = require('express');
const app =express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes')
const Port = process.env.PORT || 7000

const dburl = "mongodb://localhost:27017/social"

dotenv.config();
// Database Connection

// mongoose.connect(process.env.MONGO_URL, {userNewUrlParser: true, 
//     useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },() => {
//     console.log("connected to MongoDb cloud");
// });

mongoose.connect(dburl).then(function(){
    console.log("Connetcted to database")

    app.listen(Port, function(){
        console.log("server is running on :",Port)
    })
},function(error){
    console.log("Error in connecting to mongodb")
})


// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(routes)


app.get("/",(req,res) => {
    res.send("welcome to home page");
})



//server connection
// app.listen(Port, () => {
//     console.log("server is running on :",Port);
// });
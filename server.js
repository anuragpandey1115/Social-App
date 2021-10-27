const express = require('express');
const app =express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes')
const Port = process.env.PORT || 7000

const dburl = "mongodb+srv://social-media:Password123@cluster0.d5zqv.mongodb.net/social?retryWrites=true&w=majority"

//Database  connection
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
app.use(morgan("common"));
app.use(routes)


app.get("/",(req,res) => {
    res.send("welcome to home page");
})




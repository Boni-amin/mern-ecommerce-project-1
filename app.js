const express = require('express');
const router = require('./src/routes/api');
const app = new express();

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');

const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');
const path = require("path");



let URL="mongodb+srv://mern-ecommerce:<password>@cluster0.bifxoxg.mongodb.net/Mern-Ecommerce-project";
let option={user:'mern-ecommerce',pass:"mern1234",autoIndex:true};
mongoose.connect(URL,option).then((res)=>{
    console.log("Database Connected Succeess...")
}).catch((err)=>{
    console.log(err)
})


app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const limiter= rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);


app.set('etag', false); // turn off  / Cass data off 
// Add Backend Routing 
app.use("/api/v1",router);


// app.get("/", (req, res) => {
//     res.status(200).json({status:"success",data:"This is Home Page"});
// });


// Here Backend ke bole dewya holo je Fontend kotai ace 
// React er dist File ke use kora hocee 
app.use(express.static('client/dist'));
// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'));
});



module.exports=app;

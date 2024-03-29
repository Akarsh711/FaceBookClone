const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const {readdirSync} = require('fs'); //fs: file system
const app = express();
// This method is used to parse the incoming requests with JSON payloads. 
// Builtin middleware function json() in express
const options = {
    origin:"http://localhost:3000",
    optionSuccessStatus: 200, //some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(options));

app.use(express.json());

// STATIC WAY for routes
/* const userRoutes = require("./routes/user");
app.use("/api", userRoutes) */

// DYNAMIC WAY for routes
readdirSync("./routes/").map((r) => app.use('/', require("./routes/" + r)));

// FOR SINGLE ORIGIN



// let allowed = ["http://localhost:3000", "some other link"];

// FOR MULTIPLE ORIGIN
// function options(req, res){
//     let tmp;
//     let origin = req.header("Origin");
//     if(allowed.indexOf(origin) > -1){
//         tmp = {
//             origin: true,
//             optionSuccessStatus:200,
//         }
//     }else{
//         tmp = {
//             origin:'stupid',
//         };
//     }
//     res(null, tmp);
// }




app.get('/', (req, res) => {
    res.send('welcome from 🌎 with love');
});



// DATABASE
mongoose
.connect(process.env.DATABASE_URL, {
    useNewUrlParser : true,
})
.then(() => console.log("database connected sucessfully..."))
.catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`server is listenining on:${PORT} bale! bale! 👦👦👦👦👦`);
})
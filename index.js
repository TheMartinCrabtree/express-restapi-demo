import userData from "./data";

const express = require('express');
const app = express();



const handleGet=(req, res)=>{
    res.send("Root Get Request");
    
}

// ROUTES
app.get("/", handleGet);


app.listen(3003, ()=>console.log("listening on port 3003"));


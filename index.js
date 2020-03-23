const express = require('express');
const app = express();
const port = process.env.PORT || 3003;


const handleGet=(req, res)=>{
    res.send("Root Get Request");
}

const getAllUsers=(req, res)=>{
    res.send([1,2,3,4])
}

// ROUTES
app.get("/", handleGet);

app.get("/users", getAllUsers);

// 

app.listen(port, ()=>console.log(`listening on port: ${port}`));


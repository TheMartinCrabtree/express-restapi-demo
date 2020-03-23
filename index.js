const express = require('express');
const app = express();
const port = process.env.PORT || 3003;


const handleGet=(req, res)=>{
    res.send("Root Get Request");
}

const getAllUsers=(req, res)=>{
    res.send([1,2,3,4])
}

const getUser=(req, res)=>{
    // read request params
    res.send(req.params.id);
}

// ROUTES
app.get("/", handleGet);

app.get("/users", getAllUsers);

app.get("/user/:id", getUser);

// 

app.listen(port, ()=>console.log(`listening on port: ${port}`));


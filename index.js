const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.listen(port, ()=>console.log(`listening on port: ${port}`));

const userData = [
    {
        "id": 1,
        "name_first": "Adi",
        "name_last": "Tariq",
        "subscriber": true,
        "comments": 7
    },
    {
        "id": 2,
        "name_first": "Michelle",
        "name_last": "Tran",
        "subscriber": false,
        "comments": 2
    },
    {
        "id": 3,
        "name_first": "Angela",
        "name_last": "Mann",
        "subscriber": true,
        "comments": 10
    },
    {
        "id": 4,
        "name_first": "Daphne",
        "name_last": "Chen",
        "subscriber": false,
        "comments": 4
    },
    {
        "id": 5,
        "name_first": "Amanda",
        "name_last": "Burger",
        "subscriber": true,
        "comments": 0
    }
  ]

const handleGet=(req, res)=>{
    res.send("Root Get Request");
}

const getAllUsers=(req, res)=>{
    res.send([1,2,3,4])
}

const getUser=(req, res)=>{
    // read request req.params and/or req.query
    const userObj = userData.find((user)=>{
        console.log("user:", user.id)
        debugger
        return user.id === parseInt(req.params.id);
    })
    if(!userObj){
        res.status(404).send("User not found.");
    }
    else{
        res.send(userObj);
    }

}

// ROUTES 
app.get("/", handleGet);

app.get("/users", getAllUsers);

app.get("/user/:id", getUser);




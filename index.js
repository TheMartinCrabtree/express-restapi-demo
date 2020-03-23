const Joi = require("joi");
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.listen(port, ()=>console.log(`listening on port: ${port}`));
app.use(express.json());

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
  ];

const findUser=(userID)=>{
    return userData.find((user)=>{
        return user.id === parseInt(userID);
    })
}

const validateUser=(paramsBody)=>{
    const schema = {
        name_first:     Joi.string().min(2).required(),
        name_last:      Joi.string().min(2),
        subscriber:     Joi.boolean(),
        comments:       Joi.number().integer().min(0)
    };

    return Joi.validate(paramsBody, schema);
}

const handleGet=(req, res)=>{
    res.send("Root Get Request");
};

const getAllUsers=(req, res)=>{
    res.send([1,2,3,4])
};

const getUser=(req, res)=>{
    // read request req.params and/or req.query
    const userObj = findUser(req.params.id)
    if(!userObj){
        res.status(404).send("User not found.");
    }
    else{
        res.send(userObj);
    }

};

const addUser=(req, res)=>{
     
    const resultJoi = validateUser(req.body);
 
    if(resultJoi.error){
        // send response with 404 bad request error
        res.status(400).send(`Bad Request: ${resultJoi.error.details[0].message} `);
    }
    else
    {
        const userObj ={
            id: userData.length+1,
            name_first: req.body.name_first,
            name_last: req.body.name_last,
            subscriber: req.body.subscriber,
            comments: req.body.comments
        };
        // add new user to database
        userData.push(userObj);
        // return the user object that was just added
        res.send(userObj);
    }
    
};

const updateUser=(req,res)=>{
    const userObj = findUser(req.params.id);
    const resultJoi = validateUser(req.body)

    if(resultJoi.error){
        // send response with 404 bad request error
        return res.status(400).send(`Bad Request: ${resultJoi.error.details[0].message} `);
    }
    else
    {
        userObj.name_first = req.body.name_first;
        res.send(userObj);
    }
};

const deleteUser=(req, res)=>{
    const userObj = findUser(req.params.id);
    const resultJoi = validateUser(req.body)

    if(resultJoi.error){
        // send response with 404 bad request error
        return res.status(400).send(`Bad Request: ${resultJoi.error.details[0].message} `);
    }   

    // find index to remove, and update userData
    const index = userData.indexOf(userObj);
    userData.splice(index, 1);

    res.send(userObj);
}

// ROUTES 
app.get("/", handleGet);

app.get("/users", getAllUsers);

app.get("/user/:id", getUser);

app.post("/users", addUser);

app.put("/users/:id", updateUser);

app.delete("/users/:id", deleteUser);
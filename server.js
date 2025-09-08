const express = require('express');
const { usersModel, todosModel } = require('./db.js');
const {auth, JWT_SECRETE} = require('./auth.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
mongoose.connect('add mongodb string/dynamic-todo-app-database');

//Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())


//Default route
app.get('/', (req, res) => {
    res.sendFile('/signup.html');
})

//signup, signin endpoints
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(email + " " + password);
    try {
        await usersModel.create({
            email, password
        })

        res.json({
            message: "Successfully signed up",
        })
    } catch (e) {
        res.status(403).json({
            message: "email already exists",
        })
    }
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log("inside signin- "+email + " " + password);

    //Fixed - always wrap db calls in trycatch
    try {
        const user = await usersModel.findOne({
            email, password
        })
        console.log(user);

        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRETE);
        res.json({
            token
        })
    } catch (e) {
        console.log(e);
        res.status(403).json({
            message: "invalid credentials",
        })
    }
})


//todos, todo endpoint
app.get('/todos', auth, async (req, res) => {

    // const userId = new mongoose.Types.ObjectId(decodedData.id.toString());
    try{
        const response = await todosModel.find({ userId: req.userId });
        console.log(response);  //Array of object

        res.send(response);
    }catch(e){
        res.status(403).json({
            message : "invalid user id"
        })
    }

})

app.post('/todo', auth, async (req, res) => {

    // const userId = new mongoose.Types.ObjectId(decodedData.id.toString());
    try {
        await todosModel.create({
            todo: req.body.todo,
            done: req.body.done,
            userId: req.userId
        });

        const response = await todosModel.findOne({
            todo: req.body.todo,
            done: req.body.done,
            userId: req.userId
        })

        res.send(response);
    } catch (e) {
        res.status(403).json({
            message: "cannot connect to database"
        })
    }

})

app.put('/todo', auth, async (req, res) => {

    // const userId = new mongoose.Types.ObjectId(decodedData.id.toString());
    try {
        console.log("inside try block");
        await todosModel.findOneAndUpdate({
            _id: req.body.id
        }, { todo: req.body.todo });

        res.json({
            message: "todo updated"
        });
    } catch (e) {
        res.status(403).json({
            message: "cannot connect to database"
        });
    }
})

app.delete('/todo', auth, async (req, res) => {
    // const userId = new mongoose.Types.ObjectId(decodedData.id.toString());
    try {
        console.log("inside try block");
        await todosModel.deleteOne({
            _id: req.body.id
        });

        res.json({
            message: "todo deleted"
        })
    } catch (e) {
        res.status(403).json({
            message: "cannot connect to database"
        })
    }
})


app.listen(3000);
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const usercontroller = require('./controller/usercontroller');
const mailcontrol = require('./../controller/mailcontrol');
const app = express();
app.use(express.json()); 
const port = 3000;
const url = 'mongodb://localhost:27017/eventmanager';

mongoose.connect(url).then(() => console.log ("DB connected successfully"));

//POST-USER SIGNUP
app.route('/api/v1/register').post(usercontroller.signup);

//POST-USER LOGIN
app.route('/api/v1/login').post(usercontroller.login);

//GET-EVENT CREATION FOR LOGGED IN USERS
app.route('/api/v1/events').get(usercontroller.protect, usercontroller.getpreference);

//PUT EVENT CREATION
app.route('/api/v1/events/:id').get(usercontroller.protect, usercontroller.getpreference).put(usercontroller.protect,usercontroller.postnewevent);

//REGISTER EVENT CREATION
app.route('/api/v1/events/:id/register').get(usercontroller.protect, usercontroller.getpreference).put(usercontroller.protect,usercontroller.postnewevent);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
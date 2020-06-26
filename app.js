const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()


app.use('/static',express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

const password = process.env.PASSWORD;
const username = process.env.USERNAME;
const database = process.env.USERNAME;

// database connection
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-rczc3.mongodb.net/${database}`,{ useNewUrlParser: true });

// datebase creation
  const userSchema = {
  username: String,
  email: String
};

const User = new mongoose.model("User",userSchema);


// to ge the homepage to show
app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");

});

//route to take you register
app.get("/Register", function(req, res){
res.sendFile(__dirname + "/Register.html");

});

// route to take you to login page
app.get("/login", function(req, res){
res.sendFile(__dirname + "/login.html");

});

// route takes you to about page
app.get("/About", function(req, res){
res.sendFile(__dirname + "/About.html");

});

// route takes you to logout page
app.get("/logout", function(req, res){
res.sendFile(__dirname + "/logout.html");

});

 // create a user in MongoDb
app.post("/Register", function(req,res){
  const newUser = new User({
    username: req.body.username,
    email:req.body.email
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    } else{
      res.sendFile(__dirname + "/ThanksReg.html");
    }
  });
});

// login checking
app.post("/login", function(req,res){

const email = req.body.email;

User.findOne({email:email}, function(err, foundUser){
  if(err){
    console.log(err);
    res.send(200).json({
      message: `${err} there was an error`
    });

  } else{

    if(foundUser){
      if(foundUser.email === email){
        res.sendFile(__dirname + "/Welcome.html");
      }
    }
  }
});
});

// port
let port = process.env.PORT;
if (port === null || port == ""){
  port = 3000;
}

// starts the port
app.listen(port,()=> {
  console.log(`server started on sucessfully${port}`);

});

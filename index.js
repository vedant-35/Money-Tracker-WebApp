var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.xmaz4v0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    serverSelectionTimeoutMS: 5000,
  }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/add",(res,req)=>{
    var catagory_select = req.body.catagory_select;
    var amount_input = req.body.amount_input;
    var info = req.body.info;
    var date_input = req.body.date_input;

    var data = {
        "Category":catagory_select,
        "Amount":amount_input,
        "Info":info,
        "Date":date_input
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    })
})
app.get("/", (req, res) => {
    res.set({
        "Access-control-Allow-Origin": "*",
    });
    return res.redirect("index.html");
}).listen(5000);

console.log("Server is running on port 5000");
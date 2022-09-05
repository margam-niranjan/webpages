//jshint esversion:8
const express = require("express");
const client = require("mailchimp-marketing");
const router = express.Router();
const request = require("request");
var requ = require('superagent');
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
console.log(process.env.LIST_ID);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('views'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html"); 
});
app.get("/signUp.html", function (req, res) {
    res.sendFile(__dirname + "/signUp.html"); 
});


var mailchimpInstance = 'us10',
    listUniqueId = process.env.LIST_ID,
    mailchimpApiKey     = process.env.API_KEY;

app.post('/', function (req, res) {
  requ
    .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + Buffer.from('any:' + mailchimpApiKey).toString('base64'))
    .send({
      'merge_fields': {
            'FNAME': req.body.firstName+"   "+req.body.userName,
            'LNAME': req.body.password
          },
      'email_address': req.body.email,
      'status': 'subscribed'
      
            
    })
    
    
    .end(function (err, response) {
      console.log(response.status);
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.sendFile(__dirname + "/sucessSignUp.html");
              } else {
                res.sendFile(__dirname + "/UnsucessSignUp.html");
              }
          });
});
app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + "/index.html"); 
});


app.listen(process.env.PORT || 3000, function () {
    console.log(this.address().port);
});

//8795d63f3126894c83aae1583ca5efc1-us10
//a1e95dfaea

const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var {mongoose} = require('./connection/db_connect');
var {Patient} = require('./models/Patient');


var app = express();
const port = process.env.PORT || 3000;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true,limit: '50mb'}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
  });
  
/******** GET ***********/
app.get('/patient/list', (req, res) => {
  Patient.find().then((docs) => {
    res.send(docs);
  }, (err) => {
    res.send('Unable to fetch records');
  });
});

try{
app.post('/patient', (req, res) => {
   console.log(req.body.Name);
   console.log(req.body);
  var patientdata = Patient.create({
    name: req.body.Name,
    age: req.body.Age,
    gender: req.body.Gender,
    image: req.body.img,
    medics: req.body.med,
    notes: req.body.notes
  }).then(resp=>{
      console.log(resp)
      res.status(201).send(resp)
  })
  .catch(e=>{res.status(500).send(e)})
});
}

catch(err)
{
    console.log(err)
}
 




app.listen(port, () => {
  console.log(`Started the port at ${port}`);
});

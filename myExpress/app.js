const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const help = require('./help');
const loggin = require('./Middleware/loggin');
const morgan = require('morgan');
const port = 4000;
app.listen(port,()=>{
     console.log(`listen ${port}`);
});

//require for sent the form to localhost:4000 - line 37
app.use(express.static("public"));
app.use(express.urlencoded({ extends: true }));

app.set('view engine','ejs');
app.get('/students',(req,res)=>{
    res.render('index',{subtitle:'welcome students'});
});
app.get('/:name',(req,res)=>{
    res.render('people',{name:req.params.name});
});



//app.use(morgan('common'));
//app.use(loggin);
app.get('/',(req,res)=>{
   // res.send("Hello");
    fs.createReadStream(path.join(__dirname,'./package.json')).pipe(res);
});
app.get('/Mohammad',(req,res)=>{
    res.send("Hello Mohammad");
});

app.post('/',(req,res)=>{
    //let student = req.body.student;
    console.log(req.body);
    res.render('people',{name: req.body.fname + ' ' + req.body.lname});
   // res.send("post");
});

app.use('/',help);



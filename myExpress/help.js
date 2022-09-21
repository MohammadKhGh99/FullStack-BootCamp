let { request } = require('express');
const express = require('express');
const app = express();
const router = express.Router();
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

var Connection = require("tedious").Connection;
var config = {
  server: "MOHAMMADGH-PC\\SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: "mkhgh",
      password: "1234",
    }
   
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    // encrypt: true,
      // If you are on Microsoft Azure, you need encryption:
      encrypt: true,
      database: 'change',  //update me
      trustServerCertificate: true,
      trustedConnection: false,
      validateBulkLoadParameters:false,
      rowCollectionOnRequestCompletion:true,
      enableArithAbort: true
  }, port : 1433

  };

var connection = new Connection(config);

router.get('/about',(req,res)=>{
    res.send('about');
});

router.get('/clients',(req,res)=>{
    res.send('clients');
});

//  res.send("about is ${req.about}.client is ${req.clients}");
router.get('/:about/:clients',(req,res)=>{
    res.send("about is: " +  about + " client is: " + clients);
});
////////////////////////

app.set('view engine','ejs');
router.get('/addEmployee',(req,res)=>{
    let query = 'declare @employeeID int,@answer varchar(120)';
 
    query+='select @employeeID = (select ID from employees where id_number=@id_number)';
    query+="if @employeeID is null  begin         insert into employees values(@id_number,@first_name,@last_name,@phone_number,@email ,@password)";
    query+= "select @employeeID=@@IDENTITY         select @answer = @first_name + ' ' + @last_name + ' inserted successfuly.' ";
    query+="  end    else    begin  select @answer = 'the employee is exits'  end    select @answer";
    request = new Request(query,function(err,recordset){
        if(err) console.log(err);
        app.set('/employee',{message:recordset[0]});
    });
  request.addParameter('id_number',TYPES.VarChar,req.body.id_number);
  request.addParameter('first_name',TYPES.VarChar,req.body.first_name);
  request.addParameter('last_name',TYPES.VarChar,req.body.last_name);
  request.addParameter('phone_number',TYPES.VarChar,req.body.phone_number);
  request.addParameter('email',TYPES.VarChar,req.body.email);
  request.addParameter('password',TYPES.VarChar,req.body.password);

  request.on('row', function(columns) {  
    columns.forEach(function(column) {  
      if (column.value === null) {  
        console.log('NULL');  
      } else {  
        console.log("customer id is "  + column.value);
      }  
    });  
   connection.connect();

});
   connection.on("connect", function (err) {
    // If no error, then good to proceed.
    if (err) console.log(err);
    connection.execSql(request);

    
  
  });
  request.on("requestCompleted", function (rowCount, more) {
    connection.close();
  });



module.exports =router;
});

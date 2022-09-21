//Step 1: Connect
const express = require("express");
const bodyParser = require("body-parser");
const host = express();
var sql = require("mssql");
let { request } = require("express");


host.listen(3000, () => {
  console.log("running on port 3000");
});

var Connection = require("tedious").Connection;
var config = {
  server: "DESKTOP-TR6RALT",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "1234",
    }
   
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    // encrypt: true,
      // If you are on Microsoft Azure, you need encryption:
      encrypt: true,
      database: 'Change',  //update me
      trustServerCertificate: true,
      trustedConnection: false,
      validateBulkLoadParameters:false,
      rowCollectionOnRequestCompletion:true,
      enableArithAbort: true
  }, port : 1433

  };

//creat connection class according to what we have in tedious library
//inside the create add config with all the settings
var connection = new Connection(config);
//In connecting time check if there is an error
//event connection
connection.on("connect", function (err) {
  // If no error, then good to proceed.
  if (err) console.log(err);
  console.log("Connected");
  //send to the function to read the select
 // executeStatement()
  addCoin(); //reading the data from the sql
  //isFoundCustomer();
 //addCustomer();

});
//connecting to DB:
connection.connect();

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;


//Step 2: Execute a query
function executeStatement() {
  request = new Request("SELECT * FROM courses", function (err) {
    if (err) {
      console.log(err);
    }
  });
  var result = "";
  request.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        result += column.value + " ";
      }
    });
    console.log(result);
    result = "";
  });

  request.on("done", function (rowCount, more) {
    console.log(rowCount + " rows returned");
  });

  //gives the advantage of handling the error
  request.callback = function (err, rowCount, rows) {
    // rows is not being set but rowCount is. May be a bug.
    if (err) {
      // Error handling.
    } else {
      // Next SQL statement.
      ("SELECT * FROM courses;");
    }
  };

  // Close the connection after the final event emitted by the request, after the callback passes
  request.on("requestCompleted", function (rowCount, more) {
    connection.close();
  });
  //excute the sql
  connection.execSql(request);
}
/////////////////////////////////////addCoin function///////////////////
function  addCoin(){
  request=new Request("insert into coins values(@name,@currency_code,@country) ",function(err){
    if(err)console.log(err);
  });

  /*
  request=new Request("insert coins(name,currency_code,country) OUTPUT INSERTED.ID VALUES (@name,@currency_code,@country); ",function(err){
    if(err)console.log(err);
  });
  */
  
  request.addParameter('name',TYPES.VarChar,'dollar')
  request.addParameter('currency_code',TYPES.VarChar,'AUD')
  request.addParameter('country',TYPES.VarChar,'Australia')
  request.on('row', function(columns) {  
    columns.forEach(function(column) {  
      if (column.value === null) {  
        console.log('NULL');  
      } else {  
        console.log("coin id of inserted item is " + column.value);  
      }  
    });  
});
// Close the connection after the final event emitted by the request, after the callback passes
request.on("requestCompleted", function (rowCount, more) {
  connection.close();
});
connection.execSql(request);  
}  

/////////////////////////////////// addCustomer function ////////////////////

function addCustomer(){
  request=new Request("INSERT customers (id_number, first_name, last_name,phone_number,email) OUTPUT  INSERTED.ID VALUES (@id_number,@first_name, @last_name,@phone_number,@email); ",function(err){
    if(err)console.log(err);
  });
  
  request.addParameter('id_number',TYPES.VarChar,'111000')
  request.addParameter('first_name',TYPES.VarChar,'Ansu')
  request.addParameter('last_name',TYPES.VarChar,'Fati')
  request.addParameter('phone_number',TYPES.VarChar,'051-1010')
  request.addParameter('email',TYPES.VarChar,'ansuFati@gmail.com')
  request.on('row', function(columns) {  
    columns.forEach(function(column) {  
      if (column.value === null) {  
        console.log('NULL');  
      } else {  
        console.log("customer id is "  + column.value);
      }  
    });  
});

connection.execSql(request);  
}



/////////////////////////// isFoundCustomer function //////////////////////////
function isFoundCustomer(){
 addCustomer();
  request = new Request("SELECT * FROM customers where id='111000'", function (err) {
    if (err) {
      console.log(err);
    }
  });
  var result = "";
  request.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        result += column.value + " ";
      }
    });
    console.log(result);
    result = "";
  });


  //excute the sql
  connection.execSql(request);
  }

  



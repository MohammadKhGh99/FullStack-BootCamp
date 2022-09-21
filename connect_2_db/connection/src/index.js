// import logo from './logo.svg';
// import './App.css';
const express = require ('express') ;
const mysql = require('mssql');

const bodyparser = require('body-parser');
const { request } = require('express');
// const { request } = require('express');
const host = express();
host.use(bodyparser.json());

host.listen(3000,()=>{
  console.log('i\'m listening!');
});

// var ISOLATION_LEVEL = require('tedious').ISOLATION_LEVEL;
var Connection = require('tedious').Connection;
var config = {
  server: 'MOHAMMADGH-PC\\SQLEXPRESS', 
  authentication: {
    type: 'default',
    options: {
      userName: 'mkhgh',
      passwword: '1234',
    }
  },
  
  // database: 'my_college.', 
  //update me
  // authentication: {
  //   type: 'default',
  //   options: {
  //     userName: 'mkhgh', 
  //     //update me
  //     password: '1234' 
  //     //update me
  //   }},
  options: {
    // instanceName: 'SQLEXPRESS',
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: 'change', 
    //update me
    trustServerCertificate: true,
    trustedConnection: true,
    validateBulkLoadParameters: false,
    rowCollectionOnRequestCompletion: true,
    enableArithAbort: true
    // connectionIsolationLevel: ISOLATION_LEVEL.READ_UNCOMMITTED
  }, port : 1433
  };
var connection = new Connection(config);
connection.on('connect', function(err) {
  // If no error, then good to proceed.
  console.log("Connected");
  executeStatement2();
});
connection.connect();

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
  
function executeStatement1() {
  var request = '';
  try {
  request = new Request("select * from coins", function(err) {
    if (err) {
      console.log('Erroooooor');
    }
  });
  } catch (err) {
    console.log(err);
  };
  var result = "";
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      
      if (column.value === null) {
        console.log('NULL');
      } else {
        result += column.value + " ";
    }});
    console.log(result);
    result ="";
  });
  request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
  });
  // Close the connection after the final event emitted by the request, after the callback passes
  request.on("requestCompleted", function (rowCount, more) {
    connection.close();
  });
  connection.execSql(request);
};

function executeStatement2(){
  var request = '';
  request = new Request("insert into coins values(@coin, @code, @country)", function(err){
    if (err) console.log(err);
  });
  request.addParameter('coin', TYPES.VarChar, 'Dollar');
  request.addParameter('code', TYPES.VarChar, 'CAD');
  request.addParameter('country', TYPES.VarChar, 'Canada');
  request.on('row', function(columns){
    columns.forEach(function(column){
      if (column.value == null){
        console.log('NULL');
      } else{
        console.log("Product id of inserted item is " + column.value);
      }
    });
  });
  // Close the connection after the final event emitted by the request, after the callback passes
  request.on("requestCompleted", function (rowCount, more) {
    connection.close();
  });
  connection.execSql(request);
};

host.get('/',(req,res)=>{
  res.send('hello world !');
});
host.get('/mohammad',(req,res)=>{
  res.send('hello mohammad !');
});



// var config = {user: "sa",
//               password: "reallyStrongPwd123",
//               server: "localhost",
//               database: "master",
//               synchronize: true,
//               trustServerCertificate: true
//             };
// mysql.connect(config, function (err) {
//   if (err) console.log(err);
//   var request = new mysql.Request();
//   request.query("select * from prices", function (err, recordset) {
//     console.log(recordset.recordset);
//   });
// });
// const connection = mysql.createConnection({
//   host: 'MOHAMMADGH-PC\SQLEXPRESS',
//   user: 'mkhgh',
//   password: '1234',
//   database: 'my_college'
// });


// connection.connect((err)=>{
//   if (err){
//     console.error('error connection '+err.stack);
//     return ;
//   }
//   console.log('connection ' +connection.threadId);
// })

// //
// // connection.connect((err)=>{
// //   if (err){
// //     console.error('error connection ' + err.stack);
// //     return
// //   }
// //   console.log('connect ' + connection.threadID);
// // })

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

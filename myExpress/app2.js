const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const host = express();
let { request } = require("express");
app.use(express.static("public"));
app.use(express.urlencoded({ extends: true }));

//var sql = require("mssql");



app.listen(3000, () => {
  console.log("running on port 3000");
});
app.set('view engine','ejs');
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

  var Request = require("tedious").Request;
  var TYPES = require("tedious").TYPES;

  let employee = null;
  var connection = new Connection(config);
  // הפעלת אירוע מסוג חיבור למסד נתונים
  connection.on("connect",function(err){
    if(err) console.log(err);
   //console.log(employee);
    addEmployee();
  });
  let answer = '111';
  app.post('/add', (req,res)=>{
    employee = req.body;
    connection.connect();
     res.send(answer);
   // console.log(employee);
  });

  function addEmployee(){
    let query = 'declare @employeeID int,@answer varchar(120)';
 
    query+='select @employeeID = (select ID from employees where id_number=@id_number)';
    query+="if @employeeID is null  begin         insert into employees values(@id_number,@first_name,@last_name,@phone_number,@email ,@password)";
    query+= "select @employeeID=@@IDENTITY         select @answer = @first_name + ' ' + @last_name + ' inserted successfuly.' ";
    query+="  end    else    begin  select @answer = 'the employee is exits'  end    select @answer";
    // בניית בקשה המכילה את הקוד של הוספת העובד עם תשובה
    request = new Request(query,function(err){
        if(err) console.log(err);
    });
    console.log(employee.id);

    // הוספת פרמטר המכיל מספר זהות לשאילתה
    // הפרמטר מסוג מחרוזת 
    // הפרמטר התקבל כחלק מאובייקט בתחילת הפונקציה
  request.addParameter('id_number',TYPES.NVarChar,employee.id);
  request.addParameter('first_name',TYPES.NVarChar,employee.fname);
  request.addParameter('last_name',TYPES.NVarChar,employee.lname);
  request.addParameter('phone_number',TYPES.NVarChar,employee.phone_number);
  request.addParameter('email',TYPES.NVarChar,employee.email);
  request.addParameter('password',TYPES.NVarChar,employee.password);
  // חיבור למסד הנתונים
  request.on('row', function(columns) {  
    columns.forEach(function(column) {  
      if (column.value === null) {  
        answer = null;  
      } else {  
        answer = column.value;
       // שליחה לדף עובד עם הודעה שהתקבלה מהמסד נתונים
       app.get('/employee',(req,res)=>{
        res.render('employee',{message:answer});
    });
      }  
    });  
});

// לאחר חיבור, המערכת מפעילה את הבקשה
connection.execSql(request);


  } // end function

  // אירוע של סיום הבקשה
  request.on("requestCompleted", function (rowCount, more) {
    // סגירת חיבור
    connection.close();
   //app.set('/employee',{message:employee.fname});
  });


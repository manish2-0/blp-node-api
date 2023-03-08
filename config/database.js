const mysql = require('mysql')
const connection = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "blp"
  host: "containers-us-west-52.railway.app",
  user: "root",
  password: "rGmsbmeGFFn1WSGTBQOU",
  database: "railway"
//   multipleStatements: true
})

connection.connect()
// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
//   });

exports.connection = connection;
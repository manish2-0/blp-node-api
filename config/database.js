const mysql = require('mysql')
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blp"
  // host: process.env.DB_HOST,
  // user: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DBNAME,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
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
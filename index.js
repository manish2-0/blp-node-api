const express = require('express');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const app = express();
const corsOptions = require('./config/corsOptions');
// const TokenMiddleware = require("./middleware/token.js");
// require('dotenv').config()
const cors = require('cors');
const adminRouter = require("./routes/adminRoutes")

app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
// app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// app.use(express.json()); 
// app.use(cookieParser());
// app.use(cors());

// // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
app.use("/admin", adminRouter)


// require('./routes/unauth.js')(app);

// app.use('/', (req, res, next) => {
//     const developmentStatus=process.env.DEVELOPMENT_STATUS;
//     if(developmentStatus == "LOCAL"){
//         req.uid="SOH2000124";
//         next();
//     }else{
//         new TokenMiddleware(req, res, next);
//     }
// });
 
// require('./routes/auth.js')(app);

// let PORT = process.env.LISTEN_PORT || 8000;
let PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const session = require('express-session');




// =======================================
// To work on LOCAL comment out these next 5 lines
// =======================================
app.use(session({
    secret: process.env.SECRET || process.env.HEROKU_SECRET,
    resave: false,
    saveUninitialized: false
}));


// ===================================================
// To work on LOCAL comment back in these next 5 lines
// ===================================================
// app.use(session({
//     secret:'feedmeseymour',
//     resave: false,
//     saveUninitialized: false
// }));






// ******* PORT *******
const PORT = process.env.PORT || 3000;


// =======================================
//              GLOBAL CONFIG
// =======================================
const db = mongoose.connection;

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ 'cryptoTracker';



// Connect to Mongo
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
db.once('open', ()=>{
  console.log('Connected to Mongo');
})

// =======================================
//             ERROR/SUCCESS MESSAGES
// =======================================
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// =======================================
//              MIDDLEWARE
// =======================================

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// =======================================
//              STATIC
// =======================================
app.use(express.static('public'));

// =======================================
//              CONTROLLERS
// =======================================


const cryptoController  = require('./controllers/cryptos.js')
app.use('/cryptos', cryptoController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const userController = require('./controllers/users.js')
app.use('/users', userController);


// =======================================
//            ROUTES
// =======================================

app.get('/', (req, res)=>{
  res.send('Hello world');
});







// =======================================
//            LISTENER
// =======================================
app.listen(PORT, () => {
  console.log('Cars Store app listening on port: '+PORT)
});

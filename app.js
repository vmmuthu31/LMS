const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require("./middleware/authMiddleware")
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();


// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true},),);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine

const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs');



// database connection
const dbURI = 'mongodb+srv://admin:admin@cluster0.rxnpu.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT, () => console.log("Started on PORT: " + PORT,),))
  .catch((err) => console.log(err));



// routes
;app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/index', requireAuth, (req, res) => res.render('index'));
app.get('/html_0', requireAuth, (req, res) => res.render('html_0'));
app.get('/html_1', requireAuth, (req, res) => res.render('html_1'));
app.get('/html_end', requireAuth, (req, res) => res.render('html_end'));
app.get('/task', requireAuth, (req, res) => res.render('task'));


app.use(routes);
app.use(authRoutes);

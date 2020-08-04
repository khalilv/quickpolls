const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash'); 
const session = require('express-session'); 
const passport = require('passport');
const bodyParser = require('body-parser');

//passport config
require('./config/passport')(passport); 

//DB config 
const db = require('./config/keys').MongoURI;

//db connect
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//EJS 
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//express session 
app.use(session ({
    secret : 'quickpollssecret',
    resave : true, 
    saveUninitialized : true, 
})); 

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// connect flash 
app.use(flash()); 

//global variables 
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg'); 
    res.locals.error_msg = req.flash('error_msg'); 
    res.locals.error = req.flash('error');
    next(); 
}); 



//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'))


app.listen(PORT, console.log(`Server started on port ${PORT}`)); 
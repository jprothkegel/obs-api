const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const obsRoutes = require('./api/routes/obs');
const streamKeyRoutes = require('./api/routes/streamKey');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://vugs:Lacatolica10@ds151864.mlab.com:51864/obs-api',{useNewUrlParser:true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/obs', obsRoutes)
app.use('/streamKey', streamKeyRoutes)
app.use('/user', userRoutes);

module.exports = app;
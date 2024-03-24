// required to start project
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// connect to route file
const employeeRoute = require('./routes/employee.route.js');
const managerRoute = require('./routes/manager.route.js');
const financeteamuserRoute = require('./routes/financeteamuser.route.js');
const systemadminRoute = require('./routes/systemadministrator.route.js');
const loginRoute = require('./routes/login.route.js');

// SCHEMAS
// schema for account
const Account=require('./models/account.model.js');
// schema for claim
const Claims=require('./models/claims.model.js');

// ROUTES
// route for login
app.use('/api/login',loginRoute);
// route for employee
app.use('/api/employee',employeeRoute);
// route for manager
app.use('/api/manager',managerRoute);
// route for financeteamuser
app.use('/api/financeteamuser',financeteamuserRoute);
// route for system admininstrator
app.use('/api/systemadministrator',systemadminRoute);

// this is middleware: what format this page can take in requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect this to your local host that is running the front end react file
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your React front end origin
  }));

// when the user signs in we need to have the api call contain the account username and password- security
// for the input is required to have the input username and password
// all calls below are strictly example operations and the names you can change to whatever you wish
// ALL APIs FOR:
// Login page
app.get('/api/login/username-password',loginRoute);
// SYSTEM ADMINISTRATOR page
app.get('/api/SystemAdmin/username-password',systemadminRoute);

// EMPLOYEE PAGE
// get all claims
app.get('/api/employee/:username/:password',employeeRoute);
// make claim
app.post('/api/employee/:username/:password',employeeRoute);

// MANAGER page
app.get('/api/manager/username-password',managerRoute);
//FINANCE TEAM USER page
app.get('/api/financeteamuser/username-password',financeteamuserRoute);
// NOTE:when creating requests make sure that the username and password are required for every request by default - sequrity





// Username: samaychadhasc
// password : rJCjCAXBwnkdeiho
// mongodb+srv://samaychadhasc:rJCjCAXBwnkdeiho@backenddb.jvf8q92.mongodb.net/SE-Project-DB?retryWrites=true&w=majority&appName=BackendDB

// connect to db then run server
mongoose.connect('mongodb+srv://samaychadhasc:rJCjCAXBwnkdeiho@backenddb.jvf8q92.mongodb.net/SE-Project-DB?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {

        app.listen(3000, () => {
            console.log('server listening on port 3000');

        })
        console.log('Connected!')

    })
    .catch(() => console.log('Failed'));


    // notes
    // look into headers to manage data sent
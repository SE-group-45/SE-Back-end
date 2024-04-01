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

// connect this to your local host that is running the front end react file
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your React front end origin
  }));

// this is middleware: what format this page can take in requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SCHEMAS
// schema for account
const Account=require('./models/account.model.js');
// schema for claim
const Claims=require('./models/claim.model.js');

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

// when the user signs in we need to have the api call contain the account username and password- security
// for the input is required to have the input username and password
// all calls below are strictly example operations and the names you can change to whatever you wish
// ALL APIs FOR:
// Login page
//


//login
app.patch('/api/login',loginRoute);
//logout
app.patch('/api/login/logout',loginRoute);


// SYSTEM ADMINISTRATOR page
//
// get all accounts
app.get('/api/systemadministrator/getallaccounts/:token', systemadminRoute);
// create an account
app.post('/api/systemadministrator/create/:token', systemadminRoute);
// get a specific account by ID
app.get('/api/systemadministrator/getsingleaccount/:token/:userid', systemadminRoute);
// update an account by ID
app.put('/api/systemadministrator/updateaccount/:token/:dbid', systemadminRoute);
// delete an account by ID
app.delete('/api/systemadministrator/delete/:token', systemadminRoute);
// get all claims
app.get('/api/systemadministrator/getallclaims/:token', systemadminRoute);
// get a all claims from specific account using db claim id
app.get('/api/systemadministrator/getsingleclaim/:token/:claimid', systemadminRoute);


// EMPLOYEE PAGE
//
// get all claims
app.get('/api/employee/:token',employeeRoute);
// make claim
app.post('/api/employee/:token',employeeRoute);
// get all pending claims
app.get('/api/employee/:token/:id',employeeRoute);


// MANAGER page
//
//get specific employee claim to view
app.get('/api/manager/:token/GetClaim/:departmentID/:claimID',managerRoute);
// approve specific claim
app.put('/api/manager/ApproveClaim/:token/:dbclaimid',managerRoute);
// decline a specific claim
app.put('/api/manager/RejectClaim/:token/:dbclaimid',managerRoute);
// view al pending claims
app.get('/api/manager/:token/ViewPendingClaims/:departmentID',managerRoute);


//FINANCE TEAM USER page
//get all claims assigned to FTU
app.get('/api/financeteamuser/getclaims/:token');
// approve
app.put('/api/financeteamuser/approve/:claimid/:token');
// decline
app.put('/api/financeteamuser/deny/:claimid/:token');
// get single claim
app.get('/api/financeteamuser/viewclaim/:claimid/:token');


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
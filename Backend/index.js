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

// route for system administrator
//
// get all accounts
app.get('/api/systemadministrator/:username/:password', systemadminRoute);
// create an account
app.post('/api/systemadministrator/:username/:password', systemadminRoute);
// get a specific account by ID
app.get('/api/systemadministrator/:username/:password', systemadminRoute);
// update an account by ID
app.put('/api/systemadministrator/:username/:password', systemadminRoute);
// delete an account by ID
app.delete('/api/systemadministrator/:username/:password', systemadminRoute);
//
// get all claims
app.get('/api/systemadministrator/:username/:password', systemadminRoute);
// get a specific claim by ID
app.get('/api/systemadministrator/:username/:password', systemadminRoute);
// update a claim by ID
app.put('/api/systemadministrator/:username/:password', systemadminRoute);
// delete a claim by ID
app.delete('/api/systemadministrator/:username/:password', systemadminRoute);


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
const {PORT} = require('./config/serverConfig.js')

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')

const app = express();

const setupAndStartServer = ()=>{
    
    console.log(PORT);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api/auth' , authRoutes);
    app.use('/api/task' , taskRoutes);
    app.listen(PORT , ()=>{
            console.log(`Server is listening on the port ${PORT}`);
    })

}

setupAndStartServer();
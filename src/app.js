const {PORT} = require('./config/serverConfig.js')

const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index.js')

const app = express();

const setupAndStartServer = ()=>{
    
    console.log(PORT);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api' , apiRoutes);
    app.listen(PORT , ()=>{
            console.log(`Server is listening on the port ${PORT}`);
    })

}

setupAndStartServer();
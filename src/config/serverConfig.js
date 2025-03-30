const dotenv = require('dotenv');

dotenv.config();
console.log('port from dotenv' , process.env.PORT);
module.exports = {
    PORT : process.env.PORT
}
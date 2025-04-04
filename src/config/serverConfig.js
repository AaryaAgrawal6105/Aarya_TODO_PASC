const dotenv = require('dotenv');
const bcrypt = require('bcrypt')

dotenv.config();
console.log('port from dotenv' , process.env.PORT);
module.exports = {
    PORT : process.env.PORT,
    SALT : bcrypt.genSaltSync(10),
    JWT_KEY : process.env.JWT_KEY
}
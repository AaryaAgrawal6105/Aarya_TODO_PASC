const prisma = require('../config/database');
const jwt = require('jsonwebtoken');
const {JWT_KEY , SALT} = require('../config/serverConfig')

const validator = (req,res,next)=>{

        try {
            const token = req.headers['x-access-token'];
            if(!token){
                return res.status(401).json({ message: 'Unauthorized: No token provided' });
            }
            const verified = jwt.verify(token , JWT_KEY);
            req.user = verified;
            next();

        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

}


module.exports = {
    validator
}
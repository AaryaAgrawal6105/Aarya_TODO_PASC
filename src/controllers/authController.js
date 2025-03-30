const prisma = require('../config/database');
const bcrypt = require('bcrypt');
const {JWT_KEY , SALT} = require('../config/serverConfig')
const jwt = require('jsonwebtoken')

const signup = async (req , res)=>{
        const {email , password} = req.body;

        try {
            const existingUser = await prisma.user.findUnique({where : {
                email : email,
            }})
            if(existingUser){
                return res.status(400).json({
                    message : "User already present"
                })
            }

            const bcryptedPassword = await bcrypt.hashSync(password , SALT);

            const user = await prisma.user.create({
                data : {
                    email : email ,
                    password : bcryptedPassword
                }
            })
            // console.log(user);

            return res.status(201).json({
                message : 'user created succesfully ',
                data : user,
                err : {},
                success : true
            })


        } catch (error) {
            
                return res.status(500).json({
                    message : 'error occured in controller',
                    data : {},
                    err : error,
                    success : false
                })

        }
}

const login = async (req,res) => {
    const {email , password} = req.body;
    try {

        const user = await prisma.user.findUnique({where : {
            email : email
        }})
        // console.log(user);
        if(!user){
            return res.status(400).json({
                message : 'Invalid email'
            })
        }
        const isValid = bcrypt.compareSync(password , user.password);
        if(!isValid){
            return res.status(200).json({
                message : "invalid password"
            })
        }

        const token = jwt.sign({id : user.id , email : user.email} , JWT_KEY , {expiresIn : '1d'});
        // console.log(token)
        return res.status(201).json({
            data : token,
            message : "successfully logged in the user",
            success : true ,
            err : {}

        })

    } catch (error) {
        return res.status(400).json({
            message : "failed to login the user ! Error occured in authController/Login",
            data : {},
            err :error,
            success : false
        })
    }
}


module.exports = {
    signup,
    login
}
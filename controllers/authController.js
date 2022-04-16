const authRepository = require('../repositories/authRepository')
const userRepository = require('../repositories/userRepository')
const { secretKey } = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {USER} = require("../constants/userRole");

const generateAccessToken = (name, lastname, role, username, id) => {
    const payload = {
        name,
        lastname,
        role,
        username,
        id,
        exp: Math.floor(Date.now() / 1000) + (600000 * 2),
        iat: Math.floor(Date.now()),
    }
    return jwt.sign(payload, secretKey)
}

class authController{
    async registration(req, res){
        try{
            const { name, lastname, username, password } = req.body
            const user = await authRepository.findByUsername(username)
            if(user){
                return res.status(400).json({message: "User with same email is already exist "})
            }
            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt)
            const newUser = {
                name, last_name: lastname, role: USER, username, hash_password: hashPassword
            }
            await userRepository.post(newUser)
            return res.json({message: "User registered successfully"})
        } catch (e){
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }
    async login(req, res){
        try{
            const { username, password } = await req.body
            const user = await authRepository.findByUsername(username)
            if(!user){
                return res.status(400).json({message: "User with your username doesn't exist"})
            }
            const isValidPassword = bcrypt.compareSync(password, user.hash_password)
            if(!isValidPassword){
                return res.status(400).json({message: "Wrong password"})
            }
            const token = generateAccessToken(user.name, user.last_name, user.role, user.username, user.user_id,)
            return res.json({token: token})
        } catch (e){
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }
    async auth(req, res){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, secretKey)
            res.json(user)
        }catch (e){
            console.log(e)
            res.status(400).json({message: "Auth error"})
        }
    }
}
module.exports = new authController()

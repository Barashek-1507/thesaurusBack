const Router = require('express').Router
const authController = require('../controllers/authController')

const authRouter = Router();
authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/', authController.auth)
module.exports = authRouter

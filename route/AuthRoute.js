const express=require('express');
const Route=express.Router();
const AuthController=require('../controller/AuthController')
const middleware=require('../middleware/VerifyReg')

Route.post('/register_data',[middleware.CheckDuplicateUser], AuthController.register)
Route.post('/login_data',AuthController.login)

module.exports = Route
const express=require('express')
const Route=express.Router();
const UserController = require('../controller/UserController')

Route.get('/',UserController.home)
Route.get('/about',UserController.about)
Route.get('/contact',UserController.contact)
Route.get('/index_login',UserController.index_login)
Route.get('/register',UserController.register_page)
Route.get('/dashboard',UserController.userAuth, UserController.dashboard)
Route.get('/post',UserController.userAuth,UserController.post)
Route.post('/postdata',UserController.post_data)
Route.get('/readpost/:slug',UserController.readpost)
// Route.post('/newComment',UserController.newComment)
Route.get('/logout',UserController.logout)

module.exports = Route;


const express = require('express');
const route = express.Router()
const controller = require('../controller/AdminController')

route.get('/admin', controller.login)
route.post('/adminlogin', controller.signin)
route.get('/adminDashbord', controller.adminAuth, controller.adminDeshbord)
route.get('/about',controller.adminAuth, controller.about)
route.get('/add_about', controller.addAbout)
route.post('/addpost', controller.addPost)
route.get('/edit/:p_id', controller.edit)
route.get('/delete/:p_id', controller.delete)
route.get('/userdata', controller.userdata)
route.get('/userpost', controller.userpost)
route.get('/deletepost/:pid',controller.deletepost)
route.get('/adminLogout', controller.logout)




module.exports = route;
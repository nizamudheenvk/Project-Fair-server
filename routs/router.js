const express =require('express')
const useFormController = require('../controllers/userController')

const router = new express.Router
// register - post
router.post('/register',useFormController.registerController)
module.exports = router
const express =require('express')
const useFormController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router
// register - post
router.post('/register',useFormController.registerController)
// login post
router.post('/login',useFormController.inginCotroller)
// add project
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)

// home project get
router.get('/home-projects',projectController.getHomeProjectController)
// user project
router.get('/user-projects',jwtMiddleware,projectController.getuserProjectController)
// all-projects - get
router.get('/all-projects',jwtMiddleware,projectController.getALLProjectController)
// Edit
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single("projectImage"),projectController.editprojectController)
// delete
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjexctControler)

router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),useFormController.editUserContrtoller)


module.exports = router


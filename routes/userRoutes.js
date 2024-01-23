
const express=require('express')
const {getAllUsers,getsingleUser,updateUser,updateUserPassword,showCurrentUser } = require('../controllers/userController')
const {authenticateUser,authorizePermisson}=require('../middleware/authentication')
const router=express.Router()

router.route('/').get(authenticateUser,authorizePermisson('admin'),getAllUsers)
router.route('/showMe').get(authenticateUser,showCurrentUser)
router.route('/updateUser').patch(authenticateUser,updateUser)
router.route('/updateUserPassword').patch(authenticateUser,updateUserPassword)
router.route('/:id').get(authenticateUser,getsingleUser)

module.exports=router
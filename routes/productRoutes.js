
const express=require('express')
const {authenticateUser,authorizePermisson}=require('../middleware/authentication')
const { createProduct, uploadImage, updateProducts, deleteProducts, getAllProducts, getSingleProduct } = require('../controllers/productControllers')
const { getsingleUser } = require('../controllers/userController')
const router=express.Router()


router.route('/').post([authenticateUser,authorizePermisson('admin')],createProduct).get(getAllProducts)
router.route('/uploadImage').post([authenticateUser,authorizePermisson('admin')],uploadImage)

router.route('/:id').get(getSingleProduct).patch([authenticateUser,authorizePermisson('admin')],updateProducts).delete([authenticateUser,authorizePermisson('admin')],deleteProducts)

module.exports=router
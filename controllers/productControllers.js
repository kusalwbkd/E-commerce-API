const { StatusCodes } = require("http-status-codes")
const CustomError=require('../errors');
const Product = require("../models/Product");
const User = require("../models/User");



const createProduct=async(req,res)=>{

    req.body.user=req.user.userId
    const product=await Product.create(req.body)
res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts=async(req,res)=>{
   const products=await Product.find({})
   res.status(StatusCodes.OK).json({products,count:products.length})

}

const getSingleProduct=async(req,res)=>{

   // const{id:productId}=req.params
    const product=await Product.findOne({_id:req.params.id})
    if(!product){
        throw new CustomError.NotFoundError(`No prdouct with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const updateProducts=async(req,res)=>{
  const product=await Product.findOneAndUpdate({_id:req.params.id},req.body,{
    new:true,
    runValidators:true
  })

  if(!product){
    throw new CustomError.NotFoundError(`No prdouct with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({product})
}

const deleteProducts=async(req,res)=>{

    const product=await Product.findOne({_id:req.params.id})
    if(!product){
        throw new CustomError.NotFoundError(`No prdouct with id ${req.params.id}`)
    }
    await product.remove()
    res.status(StatusCodes.OK).json({msg:'Product deleted'})
}

const uploadImage=async(req,res)=>{
    res.send('upload image')
}

module.exports={createProduct,getAllProducts,getSingleProduct,updateProducts,deleteProducts,uploadImage}
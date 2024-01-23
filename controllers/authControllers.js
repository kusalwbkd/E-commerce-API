const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const CustomError=require('../errors')
const jwt=require('jsonwebtoken')
const {attachCookiesToResponse,createTokenUser } = require("../utils")


const register=async(req,res)=>{

    const{email,password,name}=req.body

    const emailAlredayExists=await User.findOne({email})

    if(emailAlredayExists){
        throw new CustomError.BadRequestError('The email already exists')
    }

    //first registered user as admin
    const isFirstAccount=await User.countDocuments({}) === 0

    const role= isFirstAccount? 'admin' :'user'
const user=await User.create({email,password,name,role})

const tokenUser=createTokenUser(user)

attachCookiesToResponse({res,user:tokenUser})
res.status(StatusCodes.CREATED).json({user:tokenUser})

}

const login=async(req,res)=>{
  const{email,password}=req.body

  if(!email || !password){
    throw new CustomError.BadRequestError('Please provide email and password')
  }

  const user=await User.findOne({email})

  if(!user){
    throw new CustomError.UnauthenticatedError(`There is no user with email ${email}`)
  }

  const isPasswordCorrect=await user.comparePassword(password)

  if(!isPasswordCorrect){
    throw new CustomError.UnauthenticatedError('invalid password')

  }

  const tokenUser=createTokenUser(user)

attachCookiesToResponse({res,user:tokenUser})
res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const logout=async(req,res)=>{
   res.cookie('token','logout',{
    httpOnly:true,
    expires:new Date(Date.now())
   })

   res.status(StatusCodes.OK).json({msg:'You logged out!'})
}

module.exports={register,login,logout}